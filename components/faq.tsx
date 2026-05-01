"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is the minimum stay?",
    answer: "Minimum stay is 30 days. Month-to-month options available after initial term. Great for work trips, relocations, or extended Vegas visits.",
  },
  {
    question: "What's included in the rent?",
    answer: "WiFi, water, trash, and electricity are all included. No surprise bills or resort fees. Kitchen stocked with essential cooking supplies.",
  },
  {
    question: "What is the move-in cost?",
    answer: "First month's rent plus security deposit. Furnished Apartment: $2,100 + $350 deposit. Casita Studio: $1,300 + $200 deposit.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, free parking is available on the property for all guests.",
  },
  {
    question: "How does screening work?",
    answer: "Submit your info through our form, complete a background check, and receive approval within 24-48 hours. Property address is provided after approval.",
  },
  {
    question: "Is pest control handled?",
    answer: "Yes. The property is professionally maintained and regularly treated for pests and mosquitoes, especially during summer months.",
  },
  {
    question: "What about privacy?",
    answer: "Both units have private entrances. The apartment is attached to a main home but thoughtfully walled off. The casita is a detached studio. Some shared-home noise is possible, as you'd expect in a lived-in neighborhood.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="px-6 py-10 bg-card">
      <h2 className="font-serif text-xl font-bold text-foreground text-center mb-6">
        Common Questions
      </h2>

      <div className="max-w-md mx-auto space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border/50 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-background hover:bg-secondary/50 transition-colors min-h-[48px]"
            >
              <span className="text-sm font-medium text-foreground pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 bg-background">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
