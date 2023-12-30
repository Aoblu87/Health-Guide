import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function ProfileDropdown() {
  return (
    <div
      data-hs-scrollspy-group=""
      className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover]"
    >
      <button
        type="button"
        id="hs-dropdown-default"
        className="flex items-center text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        {/* Utente loggato con immagine */}
        {/* <Image className="inline-block h-[2.875rem] w-[2.875rem] rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description"> */}

        {/* Utente loggato senza immagine */}
        <span className="inline-block h-[2.875rem] w-[2.875rem] bg-gray-100 rounded-full overflow-hidden">
          <svg
            className="h-full w-full text-gray-300"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.62854"
              y="0.359985"
              width="15"
              height="15"
              rx="7.5"
              fill="white"
            />
            <path
              d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
              fill="currentColor"
            />
            <path
              d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      <div className="hs-dropdown-menu z-10 bg-white transition-opacity duration-300 opacity-0 hs-dropdown-open:transition-none hs-dropdown-open:duration-0 sm:hs-dropdown-open:transition-[opacity,margin] sm:hs-dropdown-open:duration-[150ms] sm:transition-[opacity,margin] sm:duration-[150ms] hs-dropdown-open:opacity-100 sm:w-48 sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="#one"
        >
          Your Profile
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="#two"
        >
          Settings
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="#three"
        >
          Sign out
        </a>
      </div>
    </div>
    // <Menu as="div" className="relative ml-3">
    //   <div>
    //     <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //       <span className="absolute -inset-1.5" />
    //       <span className="sr-only">Open user menu</span>
    //       <img
    //         className="h-8 w-8 rounded-full"
    //         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //         alt=""
    //       />
    //     </Menu.Button>
    //   </div>
    //   <Transition
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //       <Menu.Item>
    //         {({ active }) => (
    //           <a
    //             href="#"
    //             className={classNames(
    //               active ? "bg-gray-100" : "",
    //               "block px-4 py-2 text-sm text-gray-700"
    //             )}
    //           >
    //             Your Profile
    //           </a>
    //         )}
    //       </Menu.Item>
    //       <Menu.Item>
    //         {({ active }) => (
    //           <a
    //             href="#"
    //             className={classNames(
    //               active ? "bg-gray-100" : "",
    //               "block px-4 py-2 text-sm text-gray-700"
    //             )}
    //           >
    //             Settings
    //           </a>
    //         )}
    //       </Menu.Item>
    //       <Menu.Item>
    //         {({ active }) => (
    //           <a
    //             href="#"
    //             className={classNames(
    //               active ? "bg-gray-100" : "",
    //               "block px-4 py-2 text-sm text-gray-700"
    //             )}
    //           >
    //             Sign out
    //           </a>
    //         )}
    //       </Menu.Item>
    //     </Menu.Items>
    //   </Transition>
    // </Menu>
  );
}
