import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import type { PossibleTypesMap } from "@apollo/client";
import possibleTypes from "../possibleTypes.json";

let singleton: ApolloClient<NormalizedCacheObject> | null = null;

export function getClient(): ApolloClient<NormalizedCacheObject> {
  if (singleton) return singleton;
  const uri = process.env.WPGRAPHQL_ENDPOINT as string | undefined;
  if (!uri) {
    // Fallback to NEXT_PUBLIC_WORDPRESS_URL if provided
    const base = process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "");
    if (base) {
      console.warn("WPGRAPHQL_ENDPOINT not set. Falling back to NEXT_PUBLIC_WORDPRESS_URL/graphql");
    }
  }

  singleton = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri: uri || `${process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "")}/graphql`, fetch }),
    cache: new InMemoryCache({
      possibleTypes: possibleTypes as PossibleTypesMap,
      typePolicies: {
        // WPGraphQL nodeByUri doesn't include stable IDs by default in our query
        Query: {
          fields: {
            nodeByUri: {
              keyArgs: ["uri"],
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
        // ACF objects often have no IDs; tell Apollo not to expect one
        AcfListingFields: {
          keyFields: false,
        },
        // Ensure we replace nested ACF objects instead of attempting to merge
        Listing: {
          fields: {
            acfListingFields: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    connectToDevTools: process.env.NODE_ENV !== "production",
  });
  return singleton;
}


