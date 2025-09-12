import { gql } from "@apollo/client";
import type { FaustTemplate } from "@faustwp/core";

type NodeByUri = {
  __typename?: string | null;
  title?: string | null;
  content?: string | null;
  name?: string | null;
} | null;

type DataShape = { nodeByUri?: NodeByUri };

const Singular: FaustTemplate<DataShape> = ({ data }) => {
  const node = data?.nodeByUri ?? null;
  const title = node?.title ?? node?.name ?? node?.__typename ?? "Untitled";
  const content = node?.content ?? "";
  return (
    <>
      <h1>{title}</h1>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p>Type: {node?.__typename ?? "Unknown"}</p>
      )}
    </>
  );
};

Singular.query = gql`
  query Singular($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Post { title content }
      ... on Page { title content }
    }
  }
`;

Singular.variables = (seedNode) => ({ uri: seedNode?.uri });

export default Singular;


