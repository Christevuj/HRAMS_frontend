import React from "react";

// shadcn/ui components (adjust paths as needed)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, Calendar, Paperclip } from "lucide-react";

export default function ContactSupport() {
  return (
    <section id="contact" className="container mx-auto p-4 md:py-20">
      {/* Support Options */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <SupportCard
          icon={<Mail className="h-5 w-5 text-[#e65b7a]" />}
          title="Email Support"
          description="Get a response within 24 hours"
          buttonText="Send Email"
        />
        <SupportCard
          icon={<MessageSquare className="h-5 w-5 text-[#e65b7a]" />}
          title="Live Chat"
          description="Available weekdays 9am-5pm"
          buttonText="Start Chat"
        />
        <SupportCard
          icon={<Phone className="h-5 w-5 text-[#e65b7a]" />}
          title="Phone Support"
          description="Call our dedicated helpline"
          buttonText="View Number"
        />
        <SupportCard
          icon={<Calendar className="h-5 w-5 text-[#e65b7a]" />}
          title="Schedule Call"
          description="Book a time with HR specialist"
          buttonText="Book Appointment"
        />
      </div>

      {/* Contact Form */}
      <section className="mb-8 flex flex-row-reverse items-center gap-2 lg:gap-12 flex-nowrap">
        <div className="w-full lg:w-[50%]">
          <h2 className="mb-4 text-lg font-semibold">Contact Form</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input placeholder="Enter your full name" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Input placeholder="Enter your email address" />
                {/* Icon at the right end */}
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Subject
              </label>
              <Input placeholder="What is your inquiry about?" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea placeholder="Please describe your issue or question in detail" />
            </div>

            {/* File Attachment */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Attach relevant documents
              </label>
              <div className="relative">
                <Input type="file" className="py-2" />
                <Paperclip className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                Screenshots, PDFs, or other files (max 10MB)
              </p>
            </div>

            <Button
              variant="default"
              className="mt-2 bg-[#e65b7a] hover:bg-violet-700"
            >
              Submit Request
            </Button>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src="/contact.jpg"
            alt="FAQ illustration"
          />
        </div>
      </section>
    </section>
  );
}

/**
 * SupportCard Component
 * A small helper component to keep the layout DRY.
 */
function SupportCard({
  icon,
  title,
  description,
  buttonText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-md bg-violet-50 p-4 shadow-sm">
      <div className="mb-2 flex items-center space-x-2">
        {/* Icon in a circle or just an icon */}
        {icon}
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mb-3 text-sm text-gray-600">{description}</p>
      <Button variant="default" className="bg-[#e65b7a] hover:bg-violet-700">
        {buttonText}
      </Button>
    </div>
  );
}
