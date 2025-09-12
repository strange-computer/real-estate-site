import { gql } from "@apollo/client";
import type { FaustTemplate } from "@faustwp/core";

type DataShape = { page?: { title?: string | null; content?: string | null } | null };

const PageTemplate: FaustTemplate<DataShape> = ({ data }) => {
  const title = data?.page?.title ?? "Untitled";
  const content = data?.page?.content ?? "";
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

PageTemplate.query = gql`
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

PageTemplate.variables = (seedNode) => ({
  uri: seedNode?.uri,
});

export default PageTemplate;


