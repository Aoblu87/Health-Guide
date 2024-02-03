import Footer from "@/components/footer";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="fixed bottom-0 right-0 left-0 mt-5 ">
        <Footer />
      </div>
    </>
  );
}
