import { ListingCardProps } from "../../components/ListingsSection";

type GraphQlImage = { sourceUrl?: string | null; altText?: string | null } | null;

type ListingNode = {
  id: string;
  slug?: string | null;
  listingFields?: {
    price?: string | null;
    address?: string | null;
    beds?: number | null;
    baths?: number | null;
    sqft?: string | null;
    status?: string | null;
  } | null;
  featuredImage?: { node?: GraphQlImage } | null;
  neighborhoods?: { nodes?: Array<{ name?: string | null }> | null } | null;
};

export function mapListingNodeToCardProps(node: ListingNode): ListingCardProps {
  const imageUrl = node.featuredImage?.node?.sourceUrl ?? "";
  const neighborhoodName = node.neighborhoods?.nodes?.[0]?.name ?? null;
  const sqftRaw = node.listingFields?.sqft ?? "";
  const sqftFormatted = formatNumberWithCommas(sqftRaw);
  return {
    id: node.id,
    price: node.listingFields?.price ?? "",
    address: node.listingFields?.address ?? "",
    beds: node.listingFields?.beds ?? 0,
    baths: node.listingFields?.baths ?? 0,
    sqft: sqftFormatted,
    imageUrl,
    status: node.listingFields?.status ?? null,
    neighborhood: neighborhoodName,
    href: node.slug ? `/listings/${node.slug}` : undefined,
  };
}

function formatNumberWithCommas(value: number | string): string {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value.toLocaleString() : String(value);
  }
  const digits = String(value).replace(/[^0-9]/g, "");
  if (!digits) return String(value ?? "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed.toLocaleString() : digits;
}


