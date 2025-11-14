"use client";
import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Copy,
  Globe2,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Department, Status } from "./hoursAndContact.types";
import {
  departments,
  formatDate,
  formatTime,
  getDepartmentStatus,
  holidays,
  timeZones,
  useLiveTime,
} from "./helpers";
import { JSX, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 font-semibold flex items-center gap-3">
      <div className="flex items-center">{icon}</div>
      <div className="text-sm">{title}</div>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const DepartmentRow: React.FC<{
  dept: Department;
  status: Status;
  onCopy: (phone: string) => void;
  copiedPhone: string | null;
}> = ({ dept, status, onCopy, copiedPhone }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-all rounded-lg">
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-gray-800 truncate">{dept.name}</h4>
      <p className="text-sm text-gray-600 mt-1 truncate">{dept.desc}</p>
      <p className="text-sm text-gray-500 mt-1">{dept.time}</p>
    </div>

    <div className="flex flex-col items-start md:items-end mt-3 md:mt-0 gap-3">
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          status.isOpen
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {status.status}
      </span>

      <div className="flex items-center gap-3">
        <a
          href={`tel:${dept.phone}`}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium break-words"
          aria-label={`Call ${dept.name}`}
        >
          {dept.phone}
        </a>
        <button
          onClick={() => onCopy(dept.phone)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title={`Copy ${dept.name} phone number`}
        >
          {copiedPhone === dept.phone ? (
            <CheckCircle2 size={16} className="text-green-600" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
      </div>

      <a
        href={`mailto:${dept.email}`}
        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-2"
      >
        <Mail size={14} /> <span className="truncate">{dept.email}</span>
      </a>
    </div>
  </div>
);

export default function HoursOfOperationPage(): JSX.Element {
  const currentTime = useLiveTime(1000);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      window.setTimeout(() => setCopiedPhone(null), 2000);
    } catch (err) {
      alert("Unable to copy to clipboard. Phone: " + phone);
    }
  };

  const phoneStatus = getDepartmentStatus(currentTime, departments[0]);
  const chatStatus = getDepartmentStatus(currentTime, departments[0]);
  const emergencyStatus = getDepartmentStatus(currentTime, departments[1]);

  return (
    <>
      <PageLayout
        title="Hours of Operation & Contact Information"
        subtitle="Stay informed about our support availability and how to reach us."
        rightSection={
          <>
            <Button
              icon={<AlertCircle size={16} />}
              variant="primary"
              size="sm"
              onClick={() => alert("Edit functionality coming soon!")}
            >
              Contact Emergency Support
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <Phone size={36} className="text-primary-500" />,
              title: "Phone Support",
              status: phoneStatus.status,
              isOpen: phoneStatus.isOpen,
            },
            {
              icon: <Headphones size={36} className="text-primary-500" />,
              title: "Live Chat",
              status: chatStatus.status,
              isOpen: chatStatus.isOpen,
            },
            {
              icon: <AlertCircle size={36} className="text-primary-500" />,
              title: "Emergency Support",
              status: emergencyStatus.status,
              isOpen: emergencyStatus.isOpen,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 border border-gray-100 p-6 text-center transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p
                className={`text-sm font-medium ${
                  card.isOpen ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.status}
              </p>
            </div>
          ))}
        </div>

        {/* Department Directory */}
        <Section icon={<Phone size={18} />} title="Department Directory">
          <div className="space-y-3">
            {departments.map((dept, idx) => (
              <DepartmentRow
                key={idx}
                dept={dept}
                status={getDepartmentStatus(currentTime, dept)}
                onCopy={handleCopy}
                copiedPhone={copiedPhone}
              />
            ))}
          </div>
        </Section>

        {/* Live Chat Support */}
        <Section icon={<MessageSquare size={18} />} title="Live Chat Support">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700 mb-1">
                Availability: Mon–Fri: 8 AM – 6 PM PST
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    chatStatus.isOpen ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {chatStatus.isOpen ? "Online" : "Offline"}
                </span>
              </p>
            </div>

            <div className="mt-2 md:mt-0 text-sm text-gray-600 md:text-right">
              <p>
                Average Wait Time:{" "}
                <span className="font-medium text-gray-800">2 minutes</span>
              </p>
              <p>Languages: English, Spanish, French</p>
            </div>
          </div>
        </Section>

        {/* Holiday Schedule */}
        <Section icon={<CalendarDays size={18} />} title="Holiday Schedule">
          <div className="divide-y">
            {holidays.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 md:p-5 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-800">{h.holiday}</span>
                <span className="text-sm text-gray-500">{h.date}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Notice Section */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl flex items-start gap-4 shadow-sm mb-8">
          <AlertTriangle
            className="text-yellow-500 flex-shrink-0 mt-0.5"
            size={22}
          />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800 mb-1">
              Holiday Notice
            </h3>
            <p className="text-sm text-yellow-700 leading-relaxed">
              During holidays, only emergency support is available. For urgent
              travel issues, call our 24/7 emergency line at{" "}
              <a
                href="tel:1-800-555-0191"
                className="font-medium underline hover:text-yellow-800"
              >
                1-800-555-0191
              </a>
              .
            </p>
          </div>
        </div>

        {/* Time Zone Info - Live Clocks */}
        <Section icon={<Globe2 size={18} />} title="Current Time - Live">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeZones.map((z, i) => (
              <div key={i} className="p-4 text-center bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 truncate">
                  {z.zone}
                </h4>
                <p className="text-2xl font-bold text-primary-600 mb-1">
                  {formatTime(currentTime, z.tz)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(currentTime, z.tz)}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </PageLayout>
    </>
  );
}
