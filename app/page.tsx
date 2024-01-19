import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center bg-[radial-radient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Hero />
    </main>
  );
}
