import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <main className="h-full flex items-center justify-center ">
        <Hero />
      </main>
      <footer className="max-w-4xl text-center mx-auto px-4sm:px-6 lg:px-8">
        <p className=" p-3 text-xs text-gray-600 dark:text-gray-500">
          © 2024 Health Guide. A product of{" "}
          <a
            className="text-slate-900 decoration-2 hover:underline font-semibold dark:text-gray-300"
            href="http://htmlstream.com/"
            target="_blank"
          >
            Stefania
          </a>
          .
        </p>
      </footer>
    </>
  );
}
