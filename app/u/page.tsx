import Footer from "@/components/footer";
import { Hero } from "@/components/hero/hero";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="fixed bottom-0 left-0 right-0  lg:ps-64 mt-5">
        <Footer />
      </div>
    </>
  );
}
