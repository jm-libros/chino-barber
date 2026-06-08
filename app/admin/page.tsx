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

      <ScheduleTable />

      <BookingForm />

      <Footer />

      <WhatsAppButton />

    </main>
  );
}