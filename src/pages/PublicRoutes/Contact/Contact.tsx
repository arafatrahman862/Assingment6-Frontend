/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "react-hook-form";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import contactImg from "@/assets/images/contact.jpg";
import contact from "@/assets/images/how.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { useAskQuestionMutation } from "@/redux/features/faq/faq.api";

interface ContactFormValues {
  name: string;
  email: string;
  question: string;
}

export default function Contact() {
  const [askQuestion, { isLoading }] = useAskQuestionMutation();

  const form = useForm<ContactFormValues>({
    mode: "onChange",
    defaultValues: { name: "", email: "", question: "" },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: ContactFormValues) => {
    console.log(data)
    try {
      await askQuestion(data).unwrap();
      toast.success("Message sent successfully!");
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to send message!");
    }
  };

  const contactCards = [
    {
      id: 1,
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Call Us",
      info: "+8801627062547",
      link: "tel:+8801627062547",
    },
    {
      id: 2,
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "WhatsApp",
      info: "+8801627062547",
      link: "https://wa.me/8801627062547",
    },
    {
      id: 3,
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      info: "arafatrahman862@gmail.com",
      link: "mailto:arafatrahman862@gmail.com",
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Contact Us"
        description="Get in touch with our support team for any inquiries."
        backgroundImage={contactImg}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
        <div
          className="relative py-10 px-6"
          style={{
            backgroundImage: `url(${contact})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactCards.slice(0, 2).map(card => (
                <a
                  key={card.id}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-center items-center text-center space-y-4 border p-6 shadow-md backdrop-blur-3xl"
                >
                  <div>{card.icon}</div>
                  <div>
                    <h3 className="text-md sm:text-xl font-bold uppercase hover:text-primary">{card.title}</h3>
                    <p className="text-sm">{card.info}</p>
                  </div>
                </a>
              ))}
            </div>
            <a
              href={contactCards[2].link}
              className="flex flex-col text-center items-center border justify-center space-y-4 p-6 shadow-md backdrop-blur-3xl"
            >
              <div>{contactCards[2].icon}</div>
              <div>
                <h3 className="text-md sm:text-xl font-bold uppercase hover:text-primary">{contactCards[2].title}</h3>
                <p className="text-sm">{contactCards[2].info}</p>
              </div>
            </a>
          </div>
        </div>


        <div className="text-white bg-background border p-6 md:p-10">
          <h2 className="mb-7 text-center lg:text-left text-md sm:text-3xl font-bold uppercase">
            Would You Like to Discuss?
          </h2>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          {...field}
                          className=" text-white !placeholder-gray-400 border  rounded-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 px-1 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          {...field}
                          className=" text-white !placeholder-gray-400 border rounded-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 px-1 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="question"
                rules={{ required: "Question is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your Question Here"
                        {...field}
                        className="!bg-background !placeholder-gray-400 resize-none min-h-[150px] rounded-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 px-0 mt-0 mb-0" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-primary text-white px-6 py-2 text-xs md:text-sm font-medium transition rounded-none "
                disabled={isLoading || !isValid}
              >
                {isLoading ? "Sending..." : "Send Message →"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
