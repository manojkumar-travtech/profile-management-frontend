"use client";
import {
  ExternalLink,
  Shield,
  Building,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUpdateTypeColor, informationCategories } from "./helper";

const GeneralInformationContent = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Clock, label: "Weeks Passport Processing", value: "6–8" },
          { icon: Shield, label: "REAL ID Deadline", value: "May 7" },
          { icon: DollarSign, label: "Current Per Diem Rates", value: "FY24" },
          { icon: Building, label: "Countries Covered", value: "195" },
        ].map((item, i) => (
          <div
            key={i}
            className="transition-transform hover:scale-105 cursor-pointer"
          >
            <Card className="shadow-sm hover:shadow-md transition-all border border-muted/40 inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5">
              <CardContent className="text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {informationCategories.map((category) => (
          <Card
            key={category.id}
            className="border border-gray-200 hover:border-gray-300 transition-all shadow-sm"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              {/* Updates */}
              {category.updates?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Recent Updates
                  </h4>
                  <div className="space-y-2">
                    {category.updates.map((update, i) => (
                      <div
                        key={i}
                        className={`text-sm p-3 rounded-md border ${getUpdateTypeColor(
                          update.type
                        )}`}
                      >
                        {update.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful Links */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Helpful Links
                </h4>
                <div className="space-y-1">
                  {category.links.map((link, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        window.open(link.url, "_blank", "noopener,noreferrer")
                      }
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors text-left group cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {link.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50 shadow-sm">
        <CardContent className="p-6 flex items-start space-x-4">
          <Shield className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-orange-900 mb-1">
              Important Travel Notice
            </h3>
            <p className="text-orange-800 text-sm mb-3">
              These links lead to official U.S. government websites. Always
              verify information directly from these sources for the most
              current requirements and procedures.
            </p>
            <p className="text-orange-700 text-xs">
              <strong>Note:</strong> Information is subject to change. Check
              official sources before making travel decisions or bookings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralInformationContent;
