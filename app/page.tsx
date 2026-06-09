import Gallery from "../components/Gallery";
import ReviewForm from "../components/ReviewForm";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import ScheduleTable from "../components/ScheduleTable";
import BookingForm from "../components/BookingForm";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <Hero />

      <Services />
     
      <Gallery />

      <Testimonials />
      
      <Gallery />

      <ScheduleTable />

      <BookingForm />

      <ReviewForm />

      <Footer />

      <WhatsAppButton />

    </main>
  );
}