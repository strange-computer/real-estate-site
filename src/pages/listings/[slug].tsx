import { GetStaticPaths, GetStaticProps } from "next";
import { getClient } from "../../../lib/faustClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { MapPin } from "lucide-react";

const LISTING_BY_SLUG = gql`
  query ListingBySlug($slug: ID!) {
    listing(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      listingFields: acfListingFields { price address beds baths sqft status specialContent }
      featuredImage { node { sourceUrl altText } }
      neighborhoods: terms(where: { taxonomies: [NEIGHBORHOOD] }) { nodes { name } }
    }
  }
`;

const LISTING_SLUGS = gql`
  query ListingSlugs($first: Int = 100) {
    listings(first: $first) { nodes { slug } }
  }
`;

type PageProps = {
  listing: {
    id: string;
    title: string;
    price: string;
    address: string;
    beds: number;
    baths: number;
    sqft: string;
    status?: string | null;
    imageUrl?: string | null;
    neighborhood?: string | null;
    content?: string | null;
    specialContent?: string | null;
  };
  headerMenu: { id: string; label: string; href: string }[];
  footerMenu: { id: string; label: string; href: string }[];
};

export default function ListingDetailPage({ listing, headerMenu, footerMenu }: PageProps) {
  return (
    <>
      <Header menuItems={headerMenu} />
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {listing.imageUrl ? (
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl mb-8 object-cover shadow"
              priority
            />
          ) : null}

          <div className="mb-6 mt-2 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{listing.title}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {listing.address}
                {listing.neighborhood ? (
                  <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">{listing.neighborhood}</Badge>
                ) : null}
              </p>
            </div>
            <div className="hidden sm:flex gap-3">
              <Link href="/listings">
                <Button variant="outline">Back to Listings</Button>
              </Link>
              <Link href="#contact">
                <Button className="bg-blue-600 hover:bg-blue-700">Schedule Tour</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-5 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-sm">Price</div>
              <div className="text-2xl font-semibold">{listing.price}</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-sm">Beds</div>
              <div className="text-2xl font-semibold">{listing.beds}</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-sm">Baths</div>
              <div className="text-2xl font-semibold">{listing.baths}</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-sm">Sq Ft</div>
              <div className="text-2xl font-semibold">{listing.sqft}</div>
            </div>
          </div>

          {listing.specialContent ? (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What&apos;s special</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: listing.specialContent }} />
            </div>
          ) : null}

          {listing.content ? (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: listing.content }} />
          ) : null}

          <div className="mt-10 sm:hidden flex gap-3">
            <Link href="/listings" className="flex-1">
              <Button variant="outline" className="w-full">Back to Listings</Button>
            </Link>
            <Link href="#contact" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Tour</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer quickLinks={footerMenu} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const { data } = await client.query({ query: LISTING_SLUGS });
  const nodes: Array<{ slug: string }> = data?.listings?.nodes ?? [];
  const paths = nodes
    .filter((n) => !!n.slug)
    .map((n) => ({ params: { slug: n.slug } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const client = getClient();
  const [{ data }, headerMenu, footerMenu] = await Promise.all([
    client.query({ query: LISTING_BY_SLUG, variables: { slug } }),
    fetchMenu(client, "primary"),
    fetchMenu(client, "footer"),
  ]);
  const n = data?.listing;
  if (!n) return { notFound: true, revalidate: 60 } as const;
  const listing = {
    id: n.id,
    title: n.title ?? "",
    price: formatPrice(n.listingFields?.price),
    address: n.listingFields?.address ?? "",
    beds: n.listingFields?.beds ?? 0,
    baths: n.listingFields?.baths ?? 0,
    sqft: formatWithCommas(n.listingFields?.sqft ?? ""),
    status: n.listingFields?.status ?? null,
    imageUrl: n.featuredImage?.node?.sourceUrl ?? null,
    neighborhood: n.neighborhoods?.nodes?.[0]?.name ?? null,
    content: n.content ?? null,
    specialContent: n.listingFields?.specialContent ?? null,
  };
  return { props: { listing, headerMenu, footerMenu }, revalidate: 60 };
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

function formatWithCommas(value: number | string): string {
  if (typeof value === "number") return Number.isFinite(value) ? value.toLocaleString() : String(value);
  const digits = String(value).replace(/[^0-9]/g, "");
  if (!digits) return String(value ?? "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed.toLocaleString() : digits;
}

function formatPrice(value: unknown): string {
  if (typeof value === "number") return `$${value.toLocaleString()}`;
  const digits = String(value ?? "").replace(/[^0-9]/g, "");
  if (!digits) return String(value ?? "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? `$${parsed.toLocaleString()}` : String(value ?? "");
}


