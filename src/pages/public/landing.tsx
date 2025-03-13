import AboutUIC from "@/components/page/AboutUs";
import Announcement from "@/components/page/Announcement";
import ContactSupport from "@/components/page/ContactSupport";
import Faqs from "@/components/page/FAQs";
import Home from "@/components/page/Home";
import JobOpening from "@/components/page/JobOpening";

const LandingPage = () => {
  return (
    <div>
      <Home />
      <JobOpening />
      <Announcement />
      <AboutUIC />
      <ContactSupport />
      <Faqs />
    </div>
  );
};

export default LandingPage;
