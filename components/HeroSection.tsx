import { Button } from "./ui/button";
import { MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type HeroProps = {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImageUrl: string;
  badgeOneLabel?: string;
  badgeTwoLabel?: string;
  badgeThreeLabel?: string;
};

export function HeroSection({
  headline,
  subheadline,
  primaryCtaText,
  secondaryCtaText,
  heroImageUrl,
  badgeOneLabel = "San Antonio Specialist",
  badgeTwoLabel = "5-Star Rated",
  badgeThreeLabel = "100% Happy Clients",
}: HeroProps) {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-blue-50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{subheadline}</p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  {badgeOneLabel}
                </span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  {badgeTwoLabel}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  {badgeThreeLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/listings">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {primaryCtaText}
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg">{secondaryCtaText}</Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src={heroImageUrl}
                alt="Cameron Hinkel - San Antonio Realtor"
                width={800}
                height={1000}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}