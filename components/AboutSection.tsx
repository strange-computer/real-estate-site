import { Award, Clock, Heart, TrendingUp } from "lucide-react";

export type AboutFeature = { title: string; description: string };

export function AboutSection({
  heading,
  intro,
  features,
  worldTitle,
  worldBody,
  statLeftValue,
  statLeftLabel,
  statRightValue,
  statRightLabel,
  satisfactionPercent = 98,
  satisfactionCaption = "Based on post-transaction surveys",
}: {
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
}) {
  const icons = [
    <Award key="award" className="w-8 h-8 text-blue-600" />,
    <Clock key="clock" className="w-8 h-8 text-blue-600" />,
    <Heart key="heart" className="w-8 h-8 text-blue-600" />,
    <TrendingUp key="trend" className="w-8 h-8 text-blue-600" />,
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{intro}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {icons[index % icons.length]}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{worldTitle}</h3>
              <p className="text-gray-600 mb-6">{worldBody}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statLeftValue}</div>
                  <div className="text-gray-600">{statLeftLabel}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statRightValue}</div>
                  <div className="text-gray-600">{statRightLabel}</div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{satisfactionPercent}%</div>
                <div className="text-gray-600">Client Satisfaction Rate</div>
                <div className="text-sm text-gray-500 mt-2">{satisfactionCaption}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}