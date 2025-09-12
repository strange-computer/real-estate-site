import { GetStaticProps } from "next";
import { getClient } from "../../lib/faustClient";
import { gql } from "@apollo/client";
import { HeroSection } from "../../components/HeroSection";
import { ListingsSection, ListingCardProps } from "../../components/ListingsSection";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AboutSection, AboutFeature } from "../../components/AboutSection";
import { ContactSection } from "../../components/ContactSection";
import { mapListingNodeToCardProps } from "../../lib/mappers/listing";

type HeroFields = {
  headline?: string | null;
  subheadline?: string | null;
  primaryCtaText?: string | null;
  secondaryCtaText?: string | null;
  badgeOneLabel?: string | null;
  badgeTwoLabel?: string | null;
  badgeThreeLabel?: string | null;
  heroImage?: {
    node?: { sourceUrl?: string | null; altText?: string | null } | null;
    sourceUrl?: string | null;
    edges?: Array<{ node?: { sourceUrl?: string | null } | null }> | null;
  } | null;
} | null;

type AboutFields = {
  heading?: string | null;
  intro?: string | null;
  worldTitle?: string | null;
  worldBody?: string | null;
  feature1Title?: string | null;
  feature1Description?: string | null;
  feature2Title?: string | null;
  feature2Description?: string | null;
  feature3Title?: string | null;
  feature3Description?: string | null;
  feature4Title?: string | null;
  feature4Description?: string | null;
  statLeftValue?: string | null;
  statLeftLabel?: string | null;
  statRightValue?: string | null;
  statRightLabel?: string | null;
  satisfactionPercent?: number | null;
  satisfactionCaption?: string | null;
} | null;

type ContactFields = {
  phone?: string | null;
  email?: string | null;
  serviceAreaText?: string | null;
  serviceAreaNote?: string | null;
  hoursWeekday?: string | null;
  hoursWeekend?: string | null;
} | null;

type FooterFields = {
  footerTagline?: string | null;
  footerLicenseNumber?: string | null;
  footerWebsite?: string | null;
  footerServiceAreas?: string | null;
} | null;

type HomeHeroQueryData = {
  nodeByUri?: {
    hero?: HeroFields;
    about?: AboutFields;
    contact?: ContactFields;
    footer?: FooterFields;
  } | null;
};

const HOME_HERO = gql`
  query HomeHero($uri: String! = "/") {
    nodeByUri(uri: $uri) {
      ... on Page {
        hero: acfHero {
          headline
          subheadline
          primaryCtaText
          secondaryCtaText
          badgeOneLabel
          badgeTwoLabel
          badgeThreeLabel
          heroImage { node { sourceUrl altText } }
        }
        about: acfHomeAbout {
          heading
          intro
          worldTitle
          worldBody
          feature1Title
          feature1Description
          feature2Title
          feature2Description
          feature3Title
          feature3Description
          feature4Title
          feature4Description
          statLeftValue
          statLeftLabel
          statRightValue
          statRightLabel
          satisfactionPercent
          satisfactionCaption
        }
        contact: acfHomeContact {
          phone
          email
          serviceAreaText
          serviceAreaNote
          hoursWeekday
          hoursWeekend
        }
        footer: acfFooter {
          footerTagline
          footerLicenseNumber
          footerWebsite
          footerServiceAreas
        }
      }
    }
  }
`;

const LISTINGS = gql`
  fragment ListingCard on Listing {
    id
    slug
    listingFields: acfListingFields { price address beds baths sqft status }
    featuredImage { node { sourceUrl altText } }
    neighborhoods: terms(where: { taxonomies: [NEIGHBORHOOD] }) { nodes { name } }
  }
  query Listings($first: Int = 4) {
    listings(first: $first) { nodes { ...ListingCard } }
  }
`;

type PageProps = {
  hero: {
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    heroImageUrl: string;
    badgeOneLabel?: string;
    badgeTwoLabel?: string;
    badgeThreeLabel?: string;
  };
  listings: ListingCardProps[];
  headerMenu: { id: string; label: string; href: string }[];
  footerMenu: { id: string; label: string; href: string }[];
  footer?: {
    footerTagline?: string | null;
    footerLicenseNumber?: string | null;
    footerWebsite?: string | null;
    footerServiceAreas?: string[];
  };
  about?: {
    heading: string;
    intro: string;
    features: AboutFeature[];
    worldTitle: string;
    worldBody: string;
    statLeftValue: string;
    statLeftLabel: string;
    statRightValue: string;
    statRightLabel: string;
    satisfactionPercent?: number;
    satisfactionCaption?: string;
  };
  contact?: {
    phone: string | null;
    email: string | null;
    serviceAreaText: string | null;
    serviceAreaNote: string | null;
    hoursWeekday: string | null;
    hoursWeekend: string | null;
  };
};

export default function HomePage({ hero, listings, headerMenu, footerMenu, about, contact, footer }: PageProps) {
  const defaultAbout: NonNullable<PageProps['about']> = {
    heading: "Why Choose Cameron Hinkel?",
    intro:
      "As a San Antonio local and passionate realtor, I bring local expertise, market knowledge, and unwavering commitment to every transaction.",
    features: [
      { title: "Top Homes", description: "Consistently finding the best homes of San Antonio" },
      { title: "Quick Response", description: "Fast response to client inquiries" },
      { title: "Client Focused", description: "Personalized service tailored to your unique needs and goals" },
      { title: "Market Expert", description: "Deep knowledge of San Antonio neighborhoods and market trends" },
    ],
    worldTitle: "The World in San Antonio",
    worldBody:
      "Having family in San Antonio as well as living here myself, I understand the unique character of each neighborhood, from the historic charm of King William to the family-friendly communities of Stone Oak. This local knowledge gives my clients a distinct advantage in finding the perfect home or investment property.",
    statLeftValue: "1000's",
    statLeftLabel: "Hidden Spots of San Antonio",
    statRightValue: "10,000's",
    statRightLabel: "to be discovered",
    satisfactionPercent: 98,
    satisfactionCaption: "Based on post-transaction surveys",
  };
  const aboutData = about ?? defaultAbout;
  return (
    <>
      <Header
        menuItems={headerMenu}
        phone={contact?.phone ?? undefined}
        email={contact?.email ?? undefined}
      />
      <HeroSection
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCtaText={hero.primaryCtaText}
        secondaryCtaText={hero.secondaryCtaText}
        heroImageUrl={hero.heroImageUrl}
        badgeOneLabel={hero.badgeOneLabel}
        badgeTwoLabel={hero.badgeTwoLabel}
        badgeThreeLabel={hero.badgeThreeLabel}
      />
      <AboutSection
        heading={aboutData.heading}
        intro={aboutData.intro}
        features={aboutData.features}
        worldTitle={aboutData.worldTitle}
        worldBody={aboutData.worldBody}
        statLeftValue={aboutData.statLeftValue}
        statLeftLabel={aboutData.statLeftLabel}
        statRightValue={aboutData.statRightValue}
        statRightLabel={aboutData.statRightLabel}
        satisfactionPercent={aboutData.satisfactionPercent}
        satisfactionCaption={aboutData.satisfactionCaption}
      />
      <ListingsSection listings={listings} />
      <ContactSection
        phone={contact?.phone ?? undefined}
        email={contact?.email ?? undefined}
        serviceAreaText={contact?.serviceAreaText ?? undefined}
        serviceAreaNote={contact?.serviceAreaNote ?? undefined}
        hoursWeekday={contact?.hoursWeekday ?? undefined}
        hoursWeekend={contact?.hoursWeekend ?? undefined}
      />
      <Footer
        quickLinks={footerMenu}
        tagline={footer?.footerTagline ?? undefined}
        licenseNumber={footer?.footerLicenseNumber ?? undefined}
        website={footer?.footerWebsite ?? undefined}
        serviceAreas={footer?.footerServiceAreas}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const client = getClient();

  const [{ data: heroData }, { data: listingsData }, headerMenu, footerMenu] = await Promise.all([
    client.query<HomeHeroQueryData>({ query: HOME_HERO, variables: { uri: "/" } }),
    client.query({ query: LISTINGS, variables: { first: 4 } }),
    fetchMenu(client, "primary"),
    fetchMenu(client, "footer"),
  ]);

  const heroFields: HeroFields = heroData?.nodeByUri?.hero ?? null;
  const aboutFields: AboutFields = heroData?.nodeByUri?.about ?? null;
  const contactFields: ContactFields = heroData?.nodeByUri?.contact ?? null;
  const footerFields: FooterFields = heroData?.nodeByUri?.footer ?? null;
  const heroImageUrl =
    heroFields?.heroImage?.node?.sourceUrl ??
    heroFields?.heroImage?.sourceUrl ??
    heroFields?.heroImage?.edges?.[0]?.node?.sourceUrl ??
    "/CAMERONHINKEL2.png";
  const hero = {
    headline: heroFields?.headline ?? "",
    subheadline: heroFields?.subheadline ?? "",
    primaryCtaText: heroFields?.primaryCtaText ?? "View Current Listings",
    secondaryCtaText: heroFields?.secondaryCtaText ?? "Schedule Consultation",
    heroImageUrl,
    badgeOneLabel: heroFields?.badgeOneLabel ?? undefined,
    badgeTwoLabel: heroFields?.badgeTwoLabel ?? undefined,
    badgeThreeLabel: heroFields?.badgeThreeLabel ?? undefined,
  };

  const listingNodes = listingsData?.listings?.nodes ?? [];
  const listings: ListingCardProps[] = listingNodes.map(mapListingNodeToCardProps);

  // Map optional About content from WP if provided
  let about: PageProps["about"] | undefined;
  if (aboutFields) {
    const features: AboutFeature[] = [];
    if (aboutFields.feature1Title || aboutFields.feature1Description) {
      features.push({ title: aboutFields.feature1Title ?? "", description: aboutFields.feature1Description ?? "" });
    }
    if (aboutFields.feature2Title || aboutFields.feature2Description) {
      features.push({ title: aboutFields.feature2Title ?? "", description: aboutFields.feature2Description ?? "" });
    }
    if (aboutFields.feature3Title || aboutFields.feature3Description) {
      features.push({ title: aboutFields.feature3Title ?? "", description: aboutFields.feature3Description ?? "" });
    }
    if (aboutFields.feature4Title || aboutFields.feature4Description) {
      features.push({ title: aboutFields.feature4Title ?? "", description: aboutFields.feature4Description ?? "" });
    }
    about = {
      heading: aboutFields.heading ?? "",
      intro: aboutFields.intro ?? "",
      features,
      worldTitle: aboutFields.worldTitle ?? "",
      worldBody: aboutFields.worldBody ?? "",
      statLeftValue: aboutFields.statLeftValue ?? "",
      statLeftLabel: aboutFields.statLeftLabel ?? "",
      statRightValue: aboutFields.statRightValue ?? "",
      statRightLabel: aboutFields.statRightLabel ?? "",
      satisfactionPercent: typeof aboutFields.satisfactionPercent === "number" ? aboutFields.satisfactionPercent : undefined,
      satisfactionCaption: aboutFields.satisfactionCaption ?? undefined,
    };
  }

  const contact: PageProps["contact"] = {
    phone: contactFields?.phone ?? null,
    email: contactFields?.email ?? null,
    serviceAreaText: contactFields?.serviceAreaText ?? null,
    serviceAreaNote: contactFields?.serviceAreaNote ?? null,
    hoursWeekday: contactFields?.hoursWeekday ?? null,
    hoursWeekend: contactFields?.hoursWeekend ?? null,
  };

  return {
    props: {
      hero,
      listings,
      headerMenu,
      footerMenu,
      footer: footerFields
        ? {
            footerTagline: footerFields.footerTagline ?? null,
            footerLicenseNumber: footerFields.footerLicenseNumber ?? null,
            footerWebsite: footerFields.footerWebsite ?? null,
            footerServiceAreas: (footerFields.footerServiceAreas || "")
              .split(/\r?\n/)
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : undefined,
      ...(about ? { about } : {}),
      contact,
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
