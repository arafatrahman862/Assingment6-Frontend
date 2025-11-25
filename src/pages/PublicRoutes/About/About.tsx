
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/layouts/Breadcrumb"
import aboutImg from "@/assets/images/about.jpg";
import aboutUs from "@/assets/images/about-us.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function About() {
    const [activeTab, setActiveTab] = useState("mission")

    const heading = "Team"
    const description = "Meet the dedicated team driving RIDE-X from engineering our platform to supporting our riders and drivers."

    const members = [
        {
            id: "member-1",
            name: "Ayesha Rahman",
            role: "CEO & Founder",
            avatar: "https://i.pravatar.cc/150?img=32",
            description: "Visionary leader driving RIDE-X strategy, partnerships, and overall growth."
        },
        {
            id: "member-2",
            name: "Rafiq Hossain",
            role: "CTO",
            avatar: "https://i.pravatar.cc/150?img=12",
            description: "Oversees technology, platform architecture, and ensures smooth integration of real-time tracking."
        },
        {
            id: "member-3",
            name: "Tania Karim",
            role: "Head of Product",
            avatar: "https://i.pravatar.cc/150?img=28",
            description: "Leads product strategy and roadmap, designing features that improve rider and driver experience."
        },
        {
            id: "member-4",
            name: "Imran Chowdhury",
            role: "Lead Software Engineer",
            avatar: "https://i.pravatar.cc/150?img=15",
            description: "Builds and maintains the core ride-sharing platform, focusing on scalability and reliability."
        },
        {
            id: "member-5",
            name: "Farhana Akter",
            role: "Operations Manager",
            avatar: "https://i.pravatar.cc/150?img=20",
            description: "Manages day-to-day operations, driver onboarding, and ensures smooth service delivery across cities."
        },
        {
            id: "member-6",
            name: "Samiul Islam",
            role: "UX/UI Designer",
            avatar: "https://i.pravatar.cc/150?img=25",
            description: "Designs intuitive interfaces and user flows to make the app simple, enjoyable, and efficient for all users."
        },
    ]


    return (
      <>
        <Breadcrumb
          title="About Us"
          description="Learn more about our vision, mission, and the story behind our ride-sharing platform."
          backgroundImage={aboutImg}
        />

        <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[560px] overflow-hidden shadow-md">
                <img
                  src={aboutUs}
                  alt="Ride sharing app illustration"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-md sm:text-3xl font-bold uppercase mb-4">
                    About Our Ride-Sharing App
                  </h2>
                  <p className="text-sm md:text-md mb-6">
                    Our platform connects riders and drivers seamlessly,
                    offering a safe, affordable, and reliable transportation
                    option for everyone. With real-time tracking, transparent
                    pricing, and advanced security features, we aim to redefine
                    urban mobility.
                  </p>
                  <p className="text-sm md:text-md">
                    Founded with the mission to make commuting easier and
                    smarter, our app empowers both riders and drivers with
                    innovative technology. Whether it’s daily commutes, urgent
                    rides, or long-distance trips, we provide a trusted platform
                    that prioritizes safety, convenience, and user satisfaction.
                  </p>
                </div>

                <div className="flex mb-6">
                  <Button
                    onClick={() => setActiveTab("mission")}
                    className={`px-6 py-2 text-xs font-semibold transition-colors border-r-0 rounded-none ${
                      activeTab === "mission"
                        ? "bg-primary text-white hover:bg-orange-700"
                        : "bg-transparent border border-gray-300 hover:border-primary"
                    }`}
                    variant={activeTab === "mission" ? "default" : "outline"}
                  >
                    Our Mission
                  </Button>
                  <Button
                    onClick={() => setActiveTab("vision")}
                    className={`px-6 py-2 text-xs font-semibold transition-colors rounded-none ${
                      activeTab === "vision"
                        ? "bg-primary text-white hover:bg-orange-700"
                        : "bg-transparent border border-gray-300 hover:border-primary"
                    }`}
                    variant={activeTab === "vision" ? "default" : "outline"}
                  >
                    Our Vision
                  </Button>
                </div>

                <Card className="rounded-none">
                  <CardContent className="p-4 sm:p-6">
                    <div>
                      {activeTab === "mission" ? (
                        <p className="text-sm md:text-md leading-relaxed">
                          Our mission is to make transportation accessible,
                          safe, and efficient for everyone. We strive to bridge
                          the gap between riders and drivers with
                          technology-driven solutions ensuring affordability,
                          convenience, and security at every step of the
                          journey.
                        </p>
                      ) : (
                        <p className="text-sm md:text-md leading-relaxed">
                          Our vision is to become the most trusted ride-sharing
                          platform, leading innovation in smart mobility. We
                          aspire to build greener, safer, and more connected
                          cities by empowering communities with sustainable
                          transport solutions and cutting-edge technology.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-md sm:text-3xl font-bold uppercase mb-4">
              {heading}
            </h2>
            <p className=" text-sm md:text-md mb-8">{description}</p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="group shadow-lg bg-background border rounded-none"
                >
                  <div className="w-full flex justify-center items-center">
                    <Avatar className=" w-32 h-32 border-4 border-primary shadow-lg">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <CardContent className="text-center">
                    <h3 className="text-md sm:text-lg font-bold uppercase group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm  mb-4 mt-4 italic">{member.role}</p>
                    <p className="text-sm md:text-md">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
