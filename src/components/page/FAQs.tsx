import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

// Example FAQ data
const faqs = [
  {
    question: "How long does the application review process take?",
    answer: "Typically 2-3 weeks depending on the position.",
  },
  {
    question: "What if I need to update my application?",
    answer: "You can edit active applications from your dashboard.",
  },
  {
    question: "How do I check my application status?",
    answer:
      "Visit the Applications tab to view all status updates for your submitted applications.",
  },
  {
    question: "What file formats are accepted for documents?",
    answer: "PDF, DOC, DOCX, JPG, and PNG formats under 10MB.",
  },
]

export default function Faqs() {
  return (
    <section id="faqs" className="mt-8 container mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-6  lg:flex-nowrap lg:p-10">
        <div className="w-full lg:w-[50%]">
          <h2 className="text-xl md:text-2xl font-semibold">
            Got Questions?
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            We’ve got answers! Browse our FAQs below or contact our support team for more help.
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-md bg-white p-3 shadow transition hover:shadow-md"
              >
                <AccordionTrigger className="flex w-full items-center space-x-2 text-left text-sm font-medium text-gray-800 transition hover:text-violet-600 focus:outline-none">
                  <div className="flex items-center px-4 gap-2">
                  <HelpCircle className="h-4 w-4 text-violet-600" />
                  <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-sm text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="relative flex-1">
          <img
            src="/faq.jpg"
            alt="FAQ illustration"
          />
        </div>
      </div>
    </section>
  )
}
