import Link from "next/link";

export type FooterMenuItem = { id: string; label: string; href: string };

const defaultQuickLinks: FooterMenuItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "listings", label: "Current Listings", href: "#listings" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Footer({
  quickLinks = defaultQuickLinks,
  tagline,
  licenseNumber,
  website,
  serviceAreas,
}: {
  quickLinks?: FooterMenuItem[];
  tagline?: string;
  licenseNumber?: string;
  website?: string;
  serviceAreas?: string[];
}) {
  const links = (quickLinks && quickLinks.length > 0) ? quickLinks : defaultQuickLinks;
  const areas = (serviceAreas && serviceAreas.length > 0)
    ? serviceAreas
    : [
        "Stone Oak",
        "Alamo Heights",
        "King William District",
        "Southside",
        "Downtown San Antonio",
        "Northwest Side",
      ];
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CAMERON HINKEL</h3>
            <p className="text-gray-300 mb-4">{tagline ?? (
              "Your trusted San Antonio real estate professional, dedicated to helping you find the perfect home or sell your property with confidence."
            )}</p>
            <div className="text-sm text-gray-400">
              <p>License #: {licenseNumber ?? "123456789"}</p>
              <p>Equal Housing Opportunity</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              {areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Cameron Hinkel Realtor. All rights reserved.</p>
          <p className="mt-2">
            Website: <span className="text-blue-400">{website ?? "CAMERONHINKELREALTOR.com"}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}