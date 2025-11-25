import { useLocation } from "react-router";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import contact from "@/assets/images/how.jpg";
import contactImg from "@/assets/images/contact.jpg";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactAdmin() {
    const location = useLocation();
    const reason = (location.state as { reason?: string })?.reason ||
        "Your Account Has Been Suspended. Please Contact Admin.";

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
        info: "+8801639768727",
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
            <section className="mb-10">
                <Breadcrumb
                    title="Contact Admin"
                    description="Get in touch with our support team for any inquiries."
                    backgroundImage={contactImg}
                />

                <div
                    className="relative py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                    style={{
                        backgroundImage: `url(${contact})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative space-y-8">
                        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">
                            {reason}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {contactCards.slice(0, 2).map(card => (
                                <a
                                    key={card.id}
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col justify-center items-center text-center space-y-4 border p-6 shadow-md backdrop-blur-3xl  bg-white/10 hover:bg-white/20 transition"
                                >
                                    <div>{card.icon}</div>
                                    <div>
                                        <h3 className="text-md sm:text-xl font-bold uppercase hover:text-primary">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm">{card.info}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <a
                            href={contactCards[2].link}
                            className="flex flex-col text-center items-center border justify-center space-y-4 p-6 shadow-md backdrop-blur-3xl  bg-white/10 hover:bg-white/20 transition"
                        >
                            <div>{contactCards[2].icon}</div>
                            <div>
                                <h3 className="text-md sm:text-xl font-bold uppercase hover:text-primary">
                                    {contactCards[2].title}
                                </h3>
                                <p className="text-sm">{contactCards[2].info}</p>
                            </div>
                        </a>
                    </div>

                </div>
            </section>
        </>
    );
}
