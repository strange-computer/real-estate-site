import { gql } from "@apollo/client";
import type { FaustTemplate } from "@faustwp/core";

type DataShape = { post?: { title?: string | null; content?: string | null } | null };

const SingleTemplate: FaustTemplate<DataShape> = ({ data }) => {
  const title = data?.post?.title ?? "Untitled";
  const content = data?.post?.content ?? "";
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

SingleTemplate.query = gql`
  query GetPost($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

SingleTemplate.variables = (seedNode) => ({
  uri: seedNode?.uri,
});

export default SingleTemplate;


