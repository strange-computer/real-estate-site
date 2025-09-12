import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactSection({
  phone = "(210) 555-0123",
  email = "cameron@cameronhinkelrealtor.com",
  serviceAreaText = "San Antonio & Surrounding Areas",
  serviceAreaNote = "Stone Oak, Alamo Heights, King William, and more",
  hoursWeekday = "Monday - Friday: 8:00 AM - 7:00 PM",
  hoursWeekend = "Saturday - Sunday: 9:00 AM - 5:00 PM",
}: {
  phone?: string;
  email?: string;
  serviceAreaText?: string;
  serviceAreaNote?: string;
  hoursWeekday?: string;
  hoursWeekend?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    priceRange: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! Cameron will get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      priceRange: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Let&apos;s Find Your Dream Home
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to buy or sell? I&apos;m here to help you navigate the San Antonio real estate market 
            with confidence and expertise.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">{phone}</p>
                  <p className="text-sm text-gray-500">Available 7 days a week</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">{email}</p>
                  <p className="text-sm text-gray-500">Response within 30 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Service Area</h4>
                  <p className="text-gray-600">{serviceAreaText}</p>
                  <p className="text-sm text-gray-500">{serviceAreaNote}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Office Hours</h4>
                  <p className="text-gray-600">{hoursWeekday}</p>
                  <p className="text-gray-600">{hoursWeekend}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyType">I&apos;m interested in</Label>
                  <Select onValueChange={(value) => handleChange("propertyType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buying">Buying a home</SelectItem>
                      <SelectItem value="selling">Selling my home</SelectItem>
                      <SelectItem value="both">Both buying and selling</SelectItem>
                      <SelectItem value="investment">Investment property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Select onValueChange={(value) => handleChange("priceRange", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-300k">Under $300,000</SelectItem>
                      <SelectItem value="300k-500k">$300,000 - $500,000</SelectItem>
                      <SelectItem value="500k-750k">$500,000 - $750,000</SelectItem>
                      <SelectItem value="over-750k">Over $750,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell me about your real estate goals..."
                  className="mt-1"
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}