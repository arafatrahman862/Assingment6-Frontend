/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import Breadcrumb from "@/components/layouts/Breadcrumb"
import faqImg from "@/assets/images/faq.jpg";
import ask from "@/assets/images/features.jpg";
import faqIllustration from "@/assets/images/faq.jpg";
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { useGetAllQuestionsQuery } from "@/redux/features/faq/faq.api"

export default function FrequentQuestions() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const { data, isLoading, isError } = useGetAllQuestionsQuery(
    { searchTerm }
  )

  const faqs = (data?.data?.data || []).filter((item: any) => item.answer && item.answer.trim() !== "").slice(0, 3)


  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <>
      <Breadcrumb
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services."
        backgroundImage={faqImg}
      />

      <section className="max-w-7xl mx-auto py-5 md:py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative w-full xl:w-[90%] h-full">
          <img
            src={faqIllustration}
            alt="FAQ Illustration"
            className="w-full h-full object-cover shadow-md"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-sm md:text-lg font-bold text-center px-4">
              Have Questions? We’ve Got Answers!
            </h2>
          </div>
        </div>
        <div>
          <div className="mb-8 text-center lg:text-left">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {isLoading ? (
            <p className="text-center">Loading FAQs...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Error loading FAQs.</p>
          ) : (
            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((item: any) => (
                  <div key={item._id} className="border">
                    <button
                      onClick={() => toggleAccordion(item._id)}
                      className="flex items-center w-full px-4 py-3 text-left font-medium text-sm md:text-md focus:outline-none"
                    >
                      <span className="mr-3 text-lg text-primary">{openId === item._id ? "●" : "○"}</span>
                      {item.question}
                    </button>
                    {openId === item._id && (
                      <div className="px-6 py-4 border-t text-sm md:text-md">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center">No matching questions found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <div
        className="relative py-12 px-6 text-center overflow-hidden h-full"
        style={{
          backgroundImage: `url(${ask})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 text-white container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
            Ask a Question
          </h2>
          <p className="text-sm md:text-base mb-5 max-w-5xl mx-auto">
            Can't find what you're looking for? Ask us anything about our rides, pricing, or services and our team will respond promptly.
          </p>
          <Link to="/contact">
            <Button className="w-auto px-6 py-3 bg-primary rounded-none text-sm sm:text-base font-bold transition-transform duration-300 ease-in-out hover:scale-105">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
