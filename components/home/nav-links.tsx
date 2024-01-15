"use client";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },

  {
    name: "How it works",
    href: "/how-it-works",
    current: false,
  },
  { name: "Contact", href: "/contact", current: false },
];

export default function NavLinks() {
  return (
    <>
      <div className="flex md:space-x-4 flex-col md:flex-row">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 active"
                : "text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
}
