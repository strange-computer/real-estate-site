import { Menu, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export type HeaderMenuItem = { id: string; label: string; href: string };

export function Header({
  menuItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "listings", label: "Listings", href: "#listings" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  phone = "(210) 555-0123",
  email = "cameron@cameronhinkelrealtor.com",
}: {
  menuItems?: HeaderMenuItem[];
  phone?: string;
  email?: string;
}) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-baseline">
              <h1 className="text-xl font-bold text-gray-900">CAMERON HINKEL</h1>
              <span className="ml-2 text-sm text-gray-600">REALTOR®</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.href} className="text-gray-700 hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href={`tel:+${phone.replace(/[^\d]/g, "")}`} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <Phone className="w-4 h-4 mr-1" />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </a>
          </div>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}