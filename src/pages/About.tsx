import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  BarChart,
  FileText,
  Mail,
  ChevronDown,
  Award,
  Target,
  Heart,
  Zap,
  Globe,
  TrendingUp,
  Plus,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LeadershipCard from "@/components/ui/LeadershipCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const About: React.FC = () => {
  const { t } = useLanguage();

  // Partners section state
  const [activePartnerTab, setActivePartnerTab] = React.useState(
    "REVENUE MANAGEMENT SYSTEMS"
  );

  // Leadership carousel state
  const [leadershipApi, setLeadershipApi] = React.useState<CarouselApi>();
  const [leadershipBottomApi, setLeadershipBottomApi] =
    React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const maxSlides = 3; // We have multiple slides for continuous scrolling

  // Leadership team data
  const leadershipTeam = [
    {
      id: 1,
      name: "Aziz Jrad",
      title: "CEO",
      image:
        "https://ui-avatars.com/api/?name=Sean+Fitzpatrick&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/seanfitzpatrick",
    },
    {
      id: 2,
      name: "Dave Collier",
      title: "Chief Revenue Officer",
      image:
        "https://ui-avatars.com/api/?name=Dave+Collier&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/davecollier",
    },
    {
      id: 3,
      name: "Mathias Verhoeven",
      title: "Chief Technical Officer",
      image:
        "https://ui-avatars.com/api/?name=Mathias+Verhoeven&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/mathiasverhoeven",
    },
    {
      id: 4,
      name: "Eva Metsu",
      title: "General Counsel",
      image:
        "https://ui-avatars.com/api/?name=Eva+Metsu&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/evametsu",
    },
    {
      id: 5,
      name: "Michael Rodriguez",
      title: "VP of Engineering",
      image:
        "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/michaelrodriguez",
    },
    {
      id: 6,
      name: "Sarah Johnson",
      title: "VP of Marketing",
      image:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/sarahjohnson",
    },
    {
      id: 7,
      name: "David Chen",
      title: "VP of Sales",
      image:
        "https://ui-avatars.com/api/?name=David+Chen&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/davidchen",
    },
    {
      id: 8,
      name: "Lisa Thompson",
      title: "VP of Operations",
      image:
        "https://ui-avatars.com/api/?name=Lisa+Thompson&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/lisathompson",
    },
    {
      id: 9,
      name: "Robert Wilson",
      title: "VP of Finance",
      image:
        "https://ui-avatars.com/api/?name=Robert+Wilson&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/robertwilson",
    },
    {
      id: 10,
      name: "Jennifer Martinez",
      title: "VP of Human Resources",
      image:
        "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=1f2937&color=ffffff&size=96&bold=true",
      linkedin: "https://www.linkedin.com/in/jennifermartinez",
    },
  ];

  // Sync carousel API with our state
  React.useEffect(() => {
    if (!leadershipApi) return;

    leadershipApi.on("select", () => {
      setCurrentSlide(leadershipApi.selectedScrollSnap());
      // Sync bottom carousel with top carousel
      if (leadershipBottomApi) {
        leadershipBottomApi.scrollTo(leadershipApi.selectedScrollSnap());
      }
    });
  }, [leadershipApi, leadershipBottomApi]);

  const partnerTabs = [
    "REVENUE MANAGEMENT SYSTEMS",
    "PROPERTY MANAGEMENT SYSTEMS",
    "BOOKING ENGINES",
    "BI SOLUTIONS",
  ];

  const partnerLogos = {
    "REVENUE MANAGEMENT SYSTEMS": [
      {
        name: "pace revenue",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=pace+revenue",
      },
      {
        name: "BEON",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=BEON",
      },
      {
        name: "IDEAS",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=IDEAS",
      },
      {
        name: "XLR8 RMS",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=XLR8+RMS",
      },
      {
        name: "yieldPlanet",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=yieldPlanet",
      },
      {
        name: "Price My Hotel Room",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=Price+My+Hotel+Room",
      },
    ],
    "PROPERTY MANAGEMENT SYSTEMS": [
      {
        name: "infor",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=infor",
      },
      {
        name: "octorate",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=octorate",
      },
      {
        name: "HSDS",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=HSDS",
      },
      {
        name: "RevControl",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=RevControl",
      },
      {
        name: "ATOMIZE",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=ATOMIZE",
      },
      {
        name: "RateBoard",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=RateBoard",
      },
    ],
    "BOOKING ENGINES": [
      {
        name: "LODGIQ",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=LODGIQ",
      },
      {
        name: "room price genie",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=room+price+genie",
      },
      {
        name: "Pricing Service.ai",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=Pricing+Service.ai",
      },
      {
        name: "RIGHT REVENUE",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=RIGHT+REVENUE",
      },
      {
        name: "Duetto",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=Duetto",
      },
      {
        name: "revenue analytics",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=revenue+analytics",
      },
    ],
    "BI SOLUTIONS": [
      {
        name: "pace revenue",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=pace+revenue",
      },
      {
        name: "BEON",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=BEON",
      },
      {
        name: "IDEAS",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=IDEAS",
      },
      {
        name: "XLR8 RMS",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=XLR8+RMS",
      },
      {
        name: "yieldPlanet",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=yieldPlanet",
      },
      {
        name: "Price My Hotel Room",
        logo: "https://via.placeholder.com/160x80/f5f5f5/666?text=Price+My+Hotel+Room",
      },
    ],
  };

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 md:py-24 lg:py-28 overflow-hidden min-h-[80vh] flex items-center">
        {/* Enhanced Background decorations */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-float"></div>
        </div>

        {/* Enhanced Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 animate-float">
            <BarChart3 size={32} className="text-white/20" />
          </div>
          <div className="absolute top-1/4 right-24 animate-float-delayed">
            <TrendingUp size={40} className="text-orange-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-24 animate-bounce-slow">
            <Globe size={36} className="text-secondary/30" />
          </div>
          <div className="absolute top-1/3 left-1/3 animate-float">
            <Users size={28} className="text-white/15" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float-delayed">
            <Award size={24} className="text-orange-400/25" />
          </div>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 px-6 py-3 rounded-full mb-8 animate-fade-in-up transition-all duration-300 shadow-lg">
              <Award size={20} className="text-secondary" />
              <span className="text-sm font-semibold text-white">
                Industry Leading Analytics Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent leading-tight">
              {t("about.title")}
            </h1>

            <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in-up animation-delay-400 text-secondary">
              {t("about.subtitle")}
            </p>

            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto mb-12">
              {t("about.description")}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-800">
              <Link
                to="/contact-sales"
                className="group relative px-8 py-4 bg-secondary border-2 border-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 hover:border-secondary/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Enhanced glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>

                {/* Premium shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                {/* Lighthouse-style inner glow */}
                <div className="absolute inset-0 shadow-inner shadow-white/20 rounded-xl transition-all duration-500"></div>

                <div className="relative flex items-center justify-center">
                  <span>Schedule Demo</span>
                </div>
              </Link>

              <Link
                to="/contact"
                className="group relative border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:backdrop-blur-3xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>

                {/* Enhanced multi-layer glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

                {/* Subtle shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
              </Link>
            </div>

            {/* Enhanced Scroll indicator */}
            <div className="animate-fade-in-up animation-delay-1000">
              <div
                className="group flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => {
                  const ourJourneySection =
                    document.getElementById("our-journey");
                  ourJourneySection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-lg font-medium">Discover our story</span>
                <div className="p-2">
                  <ChevronDown size={24} className="animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Our Story Section */}
      <ScrollAnimation>
        <section id="our-journey" className="py-24 relative overflow-hidden">
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-secondary to-accent"></div>

          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-secondary/20 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-white/90 hover:border-secondary/40 hover:scale-105 transition-all duration-300">
                  <Heart size={18} className="text-secondary" />
                  <span className="text-gray-900">Our Journey</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Transforming Data Into
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-secondary">
                    {" "}
                    Hotel Success Stories
                  </span>
                </h2>

                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-gray-900">
                      InsightForge was born from necessity.
                    </strong>{" "}
                    Founded in 2019 by hotel industry veterans and data
                    scientists who witnessed the struggle of transforming vast
                    amounts of hotel data into meaningful, actionable insights.
                  </p>
                  <p className="text-lg">
                    Our founders experienced firsthand the frustration of
                    managing properties with outdated spreadsheets, obsolete
                    reports, and valuable insights buried in endless numbers.
                    The hospitality industry deserved better.
                  </p>
                  <p className="text-lg">
                    <strong className="text-gray-900">
                      Today, we're proud to serve 500+ properties worldwide,
                    </strong>{" "}
                    empowering hotels of all sizes to make data-driven decisions
                    that enhance guest satisfaction and maximize profitability.
                  </p>
                </div>

                {/* Enhanced Stats with glassmorphism */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg hover:bg-white/80 hover:scale-105 transition-all duration-300">
                    <div className="text-3xl font-bold text-secondary mb-1">
                      500+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Hotels Served
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg hover:bg-white/80 hover:scale-105 transition-all duration-300">
                    <div className="text-3xl font-bold text-secondary mb-1">
                      15+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Countries
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg hover:bg-white/80 hover:scale-105 transition-all duration-300">
                    <div className="text-3xl font-bold text-accent mb-1">
                      98%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative animate-float">
                {/* Enhanced floating background elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-secondary/10 rounded-full blur-xl"></div>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:bg-white/90 hover:shadow-3xl hover:scale-105 transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-orange-500/10 via-secondary/10 to-accent/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Enhanced animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-6 left-6 w-10 h-10 bg-orange-500/20 rounded rotate-45 animate-pulse"></div>
                      <div className="absolute top-12 right-12 w-8 h-8 bg-secondary/20 rounded-full animate-bounce"></div>
                      <div className="absolute bottom-12 left-12 w-12 h-12 bg-accent/20 rounded-lg rotate-12 animate-pulse"></div>
                      <div className="absolute bottom-6 right-6 w-6 h-6 bg-orange-500/20 rounded-full animate-bounce animation-delay-500"></div>
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-secondary rounded-full mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
                        <BarChart3 size={48} className="text-white" />
                      </div>
                      <p className="text-gray-700 font-semibold text-lg">
                        Real-time Analytics Dashboard
                      </p>
                    </div>
                  </div>

                  {/* Enhanced interactive elements */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-secondary/10 hover:scale-105 transition-all duration-300 border border-white/40">
                      <TrendingUp size={20} className="text-secondary" />
                      <span className="text-sm font-semibold text-gray-700">
                        Revenue
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-secondary/10 hover:scale-105 transition-all duration-300 border border-white/40">
                      <Users size={20} className="text-secondary" />
                      <span className="text-sm font-semibold text-gray-700">
                        Guests
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-accent/10 hover:scale-105 transition-all duration-300 border border-white/40">
                      <Globe size={20} className="text-accent" />
                      <span className="text-sm font-semibold text-gray-700">
                        Global
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Customer Care Section */}
      <ScrollAnimation>
        <section className="py-24 relative overflow-hidden bg-gray-100">
          <div className="container-custom relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="group bg-gray-200 hover:bg-gradient-to-br hover:from-yellow-50 hover:via-amber-50 hover:to-orange-50 rounded-3xl pt-8 px-16 pb-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex flex-col min-h-[400px] cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1">
                {/* Enhanced multi-color glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/25 via-amber-200/20 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>

                {/* Additional secondary color accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-orange-200/15 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>

                {/* Customer Success Header */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-yellow-500 group-hover:to-amber-500 rounded-full shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-yellow-200/50">
                      <Users
                        size={28}
                        className="text-white group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                      Customer Success
                    </h3>
                  </div>
                </div>

                <div className="max-w-5xl flex-grow relative z-10">
                  <h2 className="text-4xl md:text-5xl font-medium mb-10 text-gray-900 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    We put our customers first. Questions or feedback? We're
                    here to help, with around the clock global support.
                  </h2>
                </div>

                <div className="max-w-5xl relative z-10">
                  <Link
                    to="/contact"
                    className="group/btn relative inline-block px-10 py-5 bg-gray-800 border-2 border-gray-800 text-white font-medium rounded-full hover:bg-gradient-to-r hover:from-yellow-500 hover:to-amber-500 hover:border-yellow-500 hover:scale-105 transition-all duration-300 text-lg overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-yellow-200/50"
                  >
                    {/* Enhanced glass overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-full"></div>

                    {/* Premium shimmer effect - contained within button */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>

                    {/* Lighthouse-style inner glow */}
                    <div className="absolute inset-0 shadow-inner shadow-white/20 rounded-full transition-all duration-500"></div>

                    <span className="relative z-10">Contact customer care</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Why InsightForge Section */}
      <ScrollAnimation>
        <section className="py-24 relative overflow-hidden bg-gray-100">
          <div className="container-custom relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Why Insight<span className="text-teal-500">Forge</span>?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  We believe in the transformative power of data to
                  revolutionize the hospitality industry, making every guest
                  experience exceptional and every business decision strategic
                  with InsightForge.
                </p>
              </div>

              {/* Three Main Benefits - Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 - Accurate Data - Teal Theme */}
                <div
                  className="card-item group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-teal-100 transition-all duration-500 cursor-pointer relative overflow-hidden"
                  onMouseEnter={(e) => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      if (card !== e.currentTarget) {
                        const illustration =
                          card.querySelector(".card-illustration");
                        if (illustration) {
                          (illustration as HTMLElement).style.filter =
                            "blur(4px)";
                          (illustration as HTMLElement).style.transition =
                            "all 0.3s ease";
                        }
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      const illustration =
                        card.querySelector(".card-illustration");
                      if (illustration) {
                        (illustration as HTMLElement).style.filter = "none";
                      }
                    });
                  }}
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-800 transition-colors duration-300">
                        Accurate, real-time data you can trust
                      </h3>
                      <p className="text-black text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        We lead with cutting-edge analytics that transform raw
                        hotel data into strategic insights—driving innovation,
                        accuracy, and smarter decisions in the hospitality
                        industry.
                      </p>
                    </div>

                    {/* Fixed position illustration */}
                    <div className="mt-8">
                      <div className="card-illustration relative flex justify-center items-center h-40 bg-gray-50 group-hover:bg-teal-50/50 rounded-xl transition-all duration-500">
                        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                          {/* Chart visualization */}
                          <div className="bg-white rounded-lg p-4 shadow-md border group-hover:shadow-lg group-hover:border-teal-200 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
                              <div className="w-16 h-2 bg-gray-200 rounded group-hover:bg-teal-100"></div>
                            </div>
                            <div className="flex items-end gap-1 h-12">
                              <div
                                className="w-3 bg-teal-500 rounded-t group-hover:bg-teal-600 transition-all duration-300"
                                style={{ height: "30%" }}
                              ></div>
                              <div
                                className="w-3 bg-teal-500 rounded-t group-hover:bg-teal-600 transition-all duration-300 delay-75"
                                style={{ height: "60%" }}
                              ></div>
                              <div
                                className="w-3 bg-teal-500 rounded-t group-hover:bg-teal-600 transition-all duration-300 delay-150"
                                style={{ height: "40%" }}
                              ></div>
                              <div
                                className="w-3 bg-teal-500 rounded-t group-hover:bg-teal-600 transition-all duration-300 delay-225"
                                style={{ height: "80%" }}
                              ></div>
                              <div
                                className="w-3 bg-teal-500 rounded-t group-hover:bg-teal-600 transition-all duration-300 delay-300"
                                style={{ height: "50%" }}
                              ></div>
                            </div>
                          </div>
                          {/* Notification bell */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 group-hover:bg-teal-600 rounded-full flex items-center justify-center group-hover:animate-bounce transition-all duration-300">
                            <div className="w-3 h-3 text-white text-xs font-bold">
                              !
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Simple Tools - Green Theme */}
                <div
                  className="card-item group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 transition-all duration-500 cursor-pointer relative overflow-hidden"
                  onMouseEnter={(e) => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      if (card !== e.currentTarget) {
                        const illustration =
                          card.querySelector(".card-illustration");
                        if (illustration) {
                          (illustration as HTMLElement).style.filter =
                            "blur(4px)";
                          (illustration as HTMLElement).style.transition =
                            "all 0.3s ease";
                        }
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      const illustration =
                        card.querySelector(".card-illustration");
                      if (illustration) {
                        (illustration as HTMLElement).style.filter = "none";
                      }
                    });
                  }}
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors duration-300">
                        Simple, intuitive tools to save you time
                      </h3>
                      <p className="text-black text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        Our easy to use, real-time dashboards empower our
                        partners to quickly identify and act on opportunities
                      </p>
                    </div>

                    {/* Fixed position illustration */}
                    <div className="mt-8">
                      <div className="card-illustration relative flex justify-center items-center h-40 bg-gray-50 group-hover:bg-green-50/50 rounded-xl transition-all duration-500">
                        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                          {/* Dashboard mockup */}
                          <div className="bg-white rounded-lg p-4 shadow-md border w-32 group-hover:shadow-lg group-hover:border-green-200 transition-all duration-300">
                            <div className="space-y-2 mb-3">
                              <div className="h-2 bg-gray-200 rounded group-hover:bg-green-100 transition-colors duration-300"></div>
                              <div className="h-2 bg-gray-200 rounded w-3/4 group-hover:bg-green-100 transition-colors duration-300 delay-75"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2 group-hover:bg-green-100 transition-colors duration-300 delay-150"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="h-3 bg-green-500 group-hover:bg-green-600 rounded transition-all duration-300"
                                  style={{
                                    opacity: 0.3 + i * 0.1,
                                    transitionDelay: `${i * 50}ms`,
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          {/* Clock icon */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center group-hover:animate-spin transition-all duration-500">
                            <div className="w-4 h-4 border-2 border-white rounded-full relative">
                              <div className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-white transform -translate-x-1/2"></div>
                              <div className="absolute top-1/2 left-1/2 w-1 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Customer Support - Orange Theme */}
                <div
                  className="card-item group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-orange-100 hover:to-orange-200 transition-all duration-500 cursor-pointer relative overflow-hidden"
                  onMouseEnter={(e) => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      if (card !== e.currentTarget) {
                        const illustration =
                          card.querySelector(".card-illustration");
                        if (illustration) {
                          (illustration as HTMLElement).style.filter =
                            "blur(4px)";
                          (illustration as HTMLElement).style.transition =
                            "all 0.3s ease";
                        }
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    const cards = document.querySelectorAll(".card-item");
                    cards.forEach((card: Element) => {
                      const illustration =
                        card.querySelector(".card-illustration");
                      if (illustration) {
                        (illustration as HTMLElement).style.filter = "none";
                      }
                    });
                  }}
                >
                  {/* Hover background effect - Orange like in the attachment */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-900 transition-colors duration-300">
                        The best customer support in the industry
                      </h3>
                      <p className="text-black text-lg leading-relaxed group-hover:text-orange-900 transition-colors duration-300">
                        With the highest-rated customer satisfaction in the
                        industry we guarantee peace of mind, with live support
                        across the globe
                      </p>
                    </div>

                    {/* Fixed position illustration */}
                    <div className="mt-8">
                      <div className="card-illustration relative flex justify-center items-center h-40 bg-gray-50 group-hover:bg-orange-50/50 rounded-xl transition-all duration-500">
                        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                          {/* Chat bubble */}
                          <div className="bg-white rounded-lg p-3 shadow-md border group-hover:shadow-lg group-hover:border-orange-200 transition-all duration-300">
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-200 rounded w-16 group-hover:bg-orange-100 transition-colors duration-300"></div>
                              <div className="h-2 bg-gray-200 rounded w-12 group-hover:bg-orange-100 transition-colors duration-300 delay-75"></div>
                            </div>
                          </div>
                          {/* Response bubble */}
                          <div className="bg-white rounded-lg p-2 shadow-md border mt-2 ml-6 group-hover:shadow-lg group-hover:border-orange-200 transition-all duration-300">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                          {/* Rating stars */}
                          <div className="absolute -bottom-2 -right-2 bg-orange-500 group-hover:bg-orange-600 rounded-full px-2 py-1 group-hover:animate-pulse transition-all duration-300">
                            <div className="flex gap-0.5">
                              <span className="text-white text-xs group-hover:text-yellow-200 transition-colors duration-300">
                                ★★★
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced Platform Features Section */}
      <ScrollAnimation>
        <section className="py-20 relative bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/30 shadow-lg hover:bg-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300">
                <Zap size={18} className="text-secondary" />
                Platform Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                Experience Next-Generation
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-secondary">
                  {" "}
                  Hotel Analytics
                </span>
              </h2>
              <p className="text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Our cutting-edge platform combines artificial intelligence,
                real-time data processing, and intuitive design to deliver
                insights that transform your hotel operations.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Left side - Feature List */}
              <div className="space-y-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Real-time Analytics Dashboard",
                    description:
                      "Monitor your hotel's performance with live data updates, interactive charts, and customizable KPI tracking.",
                    color: "black",
                  },
                  {
                    icon: TrendingUp,
                    title: "Predictive Revenue Intelligence",
                    description:
                      "AI-powered forecasting helps optimize pricing strategies and maximize revenue potential.",
                    color: "steel",
                  },
                  {
                    icon: Users,
                    title: "Guest Experience Insights",
                    description:
                      "Understand guest preferences and behavior patterns to deliver personalized experiences.",
                    color: "orange",
                  },
                  {
                    icon: Globe,
                    title: "Multi-Property Management",
                    description:
                      "Seamlessly manage multiple properties from a single, unified dashboard interface.",
                    color: "teal",
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        feature.color === "black"
                          ? "bg-gradient-to-br from-gray-800 to-gray-900"
                          : feature.color === "steel"
                          ? "bg-gradient-to-br from-slate-600 to-slate-700"
                          : feature.color === "orange"
                          ? "bg-gradient-to-br from-orange-500 to-orange-600"
                          : "bg-gradient-to-br from-teal-500 to-teal-600"
                      }`}
                    >
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold text-gray-900 mb-2 transition-colors ${
                          feature.color === "black"
                            ? "group-hover:text-gray-800"
                            : feature.color === "steel"
                            ? "group-hover:text-slate-600"
                            : feature.color === "orange"
                            ? "group-hover:text-secondary"
                            : "group-hover:text-teal-500"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side - Interactive Demo Preview */}
              <div className="relative">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  {/* Mock Dashboard Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 grid-rows-6 gap-2 h-full">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div
                            key={i}
                            className={`bg-gradient-to-br ${
                              i % 4 === 0
                                ? "from-gray-800/30 to-gray-800/10"
                                : i % 4 === 1
                                ? "from-slate-600/30 to-slate-600/10"
                                : i % 4 === 2
                                ? "from-orange-500/30 to-orange-500/10"
                                : "from-teal-500/30 to-teal-500/10"
                            } rounded animate-pulse`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Mock Interface Elements */}
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <BarChart3 size={16} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">
                              InsightForge Dashboard
                            </div>
                            <div className="text-xs text-gray-600">
                              Real-time Analytics
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        </div>
                      </div>

                      {/* Mock Chart */}
                      <div className="flex-1 bg-white/50 rounded-xl p-4 border border-gray-200/50">
                        <div className="h-full flex items-end justify-between gap-2">
                          {[65, 80, 45, 90, 70, 85, 60].map((height, i) => (
                            <div
                              key={i}
                              className={`rounded-t transition-all duration-1000 hover:scale-110 ${
                                i % 4 === 0
                                  ? "bg-gradient-to-t from-gray-800 to-gray-600"
                                  : i % 4 === 1
                                  ? "bg-gradient-to-t from-slate-600 to-slate-400"
                                  : i % 4 === 2
                                  ? "bg-gradient-to-t from-orange-500 to-orange-300"
                                  : "bg-gradient-to-t from-teal-500 to-teal-300"
                              }`}
                              style={{
                                height: `${height}%`,
                                animationDelay: `${i * 200}ms`,
                                width: "12%",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Mock Stats */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {[
                          {
                            label: "Revenue",
                            value: "$124.5K",
                            color: "black",
                          },
                          {
                            label: "Occupancy",
                            value: "87.3%",
                            color: "steel",
                          },
                          { label: "ADR", value: "$189", color: "orange" },
                        ].map((stat, i) => (
                          <div
                            key={stat.label}
                            className="bg-white/60 rounded-lg p-3 text-center"
                          >
                            <div
                              className={`text-lg font-bold ${
                                stat.color === "black"
                                  ? "text-gray-800"
                                  : stat.color === "steel"
                                  ? "text-slate-600"
                                  : "text-secondary"
                              }`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating action button */}
                  <div className="absolute -bottom-4 -right-4">
                    <Link
                      to="/contact"
                      className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                    >
                      <span className="text-white text-xl font-bold">→</span>
                    </Link>
                  </div>
                </div>

                {/* Enhanced Platform Features CTA with Gold Color #E6B325 */}
                <div className="relative mt-12 bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-2xl hover:bg-white/80 hover:shadow-3xl hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E6B325]/5 to-[#E6B325]/10 rounded-3xl"></div>

                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#E6B325] to-[#D4A017] rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap size={24} className="text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        Ready to Transform Your Hotel?
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                      Experience the power of data-driven hospitality management
                      with our comprehensive analytics platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <Link
                        to="/contact-sales"
                        className="group relative px-8 py-4 bg-gradient-to-r from-[#E6B325] to-[#D4A017] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                      >
                        {/* Enhanced glass overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>

                        {/* Premium shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                        {/* Lighthouse-style inner glow */}
                        <div className="absolute inset-0 shadow-inner shadow-white/20 rounded-xl transition-all duration-500"></div>

                        <div className="relative flex items-center justify-center">
                          <span>Schedule Demo</span>
                        </div>
                      </Link>

                      <Link
                        to="/contact"
                        className="group relative border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:backdrop-blur-3xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden"
                      >
                        <span className="relative z-10">Contact Us</span>

                        {/* Enhanced multi-layer glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

                        {/* Subtle shimmer effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating elements around the card */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced Partners Section */}
      <ScrollAnimation>
        <section className="py-24 relative overflow-hidden bg-white">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Our partners
                </h2>
              </div>

              {/* Partner Tabs Navigation */}
              <div className="flex flex-wrap justify-center mb-12 gap-0">
                {partnerTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`relative px-6 py-4 text-sm font-semibold transition-all duration-300 hover:text-gray-900 ${
                      activePartnerTab === tab
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActivePartnerTab(tab)}
                  >
                    {tab}
                    {/* Underline for active tab */}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform transition-all duration-300 ${
                        activePartnerTab === tab
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      }`}
                    ></div>
                  </button>
                ))}
              </div>

              {/* Partner Logos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mt-16 animate-fade-in">
                {partnerLogos[activePartnerTab].map((partner, index) => (
                  <div
                    key={`${activePartnerTab}-${partner.name}`}
                    className="flex items-center justify-center p-6 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-500 hover:text-gray-900 transition-colors duration-300">
                        {partner.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Leadership Team Section */}
      <ScrollAnimation>
        <section className="py-24 bg-gray-50">
          <div className="max-w-full mx-auto pl-20 pr-4">
            <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
              {/* Section Header */}
              <div className="lg:col-span-4 lg:pl-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                  Meet our <span className="text-primary">leadership team</span>
                </h2>
              </div>

              {/* Carousel Navigation */}
              <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-end lg:mr-16">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      leadershipApi?.scrollPrev();
                    }}
                    disabled={!leadershipApi?.canScrollPrev()}
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-primary hover:border-primary flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 18l-6-6 6-6"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      leadershipApi?.scrollNext();
                    }}
                    disabled={!leadershipApi?.canScrollNext()}
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-primary hover:border-primary flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 18l6-6-6-6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Leadership Carousel */}
            <div className="relative">
              <div
                className="overflow-hidden"
                style={{ marginLeft: "2rem", marginRight: "4rem" }}
              >
                <div className="grid grid-rows-2 gap-6 h-full">
                  {/* Top Row Carousel */}
                  <Carousel
                    setApi={setLeadershipApi}
                    opts={{
                      align: "start",
                      loop: false,
                      slidesToScroll: 1,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {leadershipTeam.slice(0, 5).map((member, index) => (
                        <CarouselItem
                          key={`top-${member.id}`}
                          className="basis-1/4 pl-4"
                        >
                          <LeadershipCard
                            name={member.name}
                            title={member.title}
                            image={member.image}
                            linkedin={member.linkedin}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {/* Bottom Row Carousel - synchronized */}
                  <Carousel
                    setApi={setLeadershipBottomApi}
                    opts={{
                      align: "start",
                      loop: false,
                      slidesToScroll: 1,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {leadershipTeam.slice(5, 10).map((member, index) => (
                        <CarouselItem
                          key={`bottom-${member.id}`}
                          className="basis-1/4 pl-4"
                        >
                          <LeadershipCard
                            name={member.name}
                            title={member.title}
                            image={member.image}
                            linkedin={member.linkedin}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default About;
