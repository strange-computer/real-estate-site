import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import type { GetStaticPaths, GetStaticProps } from "next";

export const config = { runtime: "edge" } as const;

export default function Page(props: Parameters<typeof WordPressTemplate>[0]) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = (ctx) => getWordPressProps({ ctx });
export const getStaticPaths: GetStaticPaths = () => ({ paths: [], fallback: "blocking" });



