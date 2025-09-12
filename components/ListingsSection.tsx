import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ListingCardProps = {
  id: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  imageUrl: string;
  status?: string | null;
  neighborhood?: string | null;
  href?: string;
};

export function ListingsSection({
  title = "Featured San Antonio Listings",
  subtitle =
    "Discover beautiful homes across San Antonio's most desirable neighborhoods. Each property is carefully selected to offer exceptional value and lifestyle.",
  listings,
  showViewAll = true,
}: {
  title?: string;
  subtitle?: string;
  listings: ListingCardProps[];
  showViewAll?: boolean;
}) {
  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={listing.imageUrl}
                  alt={`Home at ${listing.address}`}
                  width={1200}
                  height={800}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                {listing.status ? (
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{listing.status}</Badge>
                ) : null}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{listing.price}</h3>
                  {listing.neighborhood ? (
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.neighborhood}
                    </div>
                  ) : null}
                </div>

                <p className="text-gray-600 mb-4">{listing.address}</p>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.beds} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.baths} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.sqft} sqft</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {listing.href ? (
                    <Link href={listing.href} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                    </Link>
                  ) : (
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Details</Button>
                  )}
                  <Link href="#contact" className="flex-1">
                    <Button variant="outline" className="w-full">Schedule Tour</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAll ? (
          <div className="text-center mt-12">
            <Link href="/listings">
              <Button variant="outline" size="lg" className="bg-white">View All Listings</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}