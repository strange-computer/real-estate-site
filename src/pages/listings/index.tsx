import { GetStaticProps } from "next";
import { getClient } from "../../../lib/faustClient";
import { gql } from "@apollo/client";
import { ListingsSection, ListingCardProps } from "../../../components/ListingsSection";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { mapListingNodeToCardProps } from "../../../lib/mappers/listing";

const LISTINGS = gql`
  fragment ListingCard on Listing {
    id
    slug
    listingFields: acfListingFields { price address beds baths sqft status }
    featuredImage { node { sourceUrl altText } }
    neighborhoods: terms(where: { taxonomies: [NEIGHBORHOOD] }) { nodes { name } }
  }
  query Listings($first: Int = 8) {
    listings(first: $first) { nodes { ...ListingCard } }
  }
`;

const HOME_CONTACT = gql`
  query HomeContact($uri: String! = "/") {
    nodeByUri(uri: $uri) {
      ... on Page {
        contact: acfHomeContact {
          phone
          email
        }
      }
    }
  }
`;

type PageProps = {
  listings: ListingCardProps[];
  headerMenu: { id: string; label: string; href: string }[];
  footerMenu: { id: string; label: string; href: string }[];
  contactPhone?: string | null;
  contactEmail?: string | null;
};

export default function ListingsPage({ listings, headerMenu, footerMenu, contactPhone, contactEmail }: PageProps) {
  return (
    <>
      <Header menuItems={headerMenu} phone={contactPhone ?? undefined} email={contactEmail ?? undefined} />
      <ListingsSection listings={listings} title="All Listings" showViewAll={false} />
      <Footer quickLinks={footerMenu} />
    </>
  );
}

type HomeContactQueryData = {
  nodeByUri?: { contact?: { phone?: string | null; email?: string | null } | null } | null;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const client = getClient();
  const [{ data }, { data: homeContactData }, headerMenu, footerMenu] = await Promise.all([
    client.query({ query: LISTINGS, variables: { first: 8 } }),
    client.query<HomeContactQueryData>({ query: HOME_CONTACT, variables: { uri: "/" } }),
    fetchMenu(client, "primary"),
    fetchMenu(client, "footer"),
  ]);

  const listingNodes = data?.listings?.nodes ?? [];
  const listings: ListingCardProps[] = listingNodes.map(mapListingNodeToCardProps);

  return {
    props: {
      listings,
      headerMenu,
      footerMenu,
      contactPhone: homeContactData?.nodeByUri?.contact?.phone ?? null,
      contactEmail: homeContactData?.nodeByUri?.contact?.email ?? null,
    },
    revalidate: 60,
  };
};

const MENU_QUERY = gql`
  query MenuBySlug($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      id
      menuItems(first: 100) { nodes { id label url path } }
    }
  }
`;

async function fetchMenu(client: ReturnType<typeof getClient>, slug: string) {
  const { data } = await client.query({ query: MENU_QUERY, variables: { slug } });
  const nodes: Array<{ id: string; label: string; url?: string | null; path?: string | null }> =
    data?.menu?.menuItems?.nodes ?? [];
  return nodes.map((n) => ({ id: n.id, label: n.label, href: n.path || n.url || "#" }));
}


