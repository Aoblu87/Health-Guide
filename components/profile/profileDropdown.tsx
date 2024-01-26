import photo from "@/public/assets/photo-1438761681033-6461ffad8d80.avif";
import Image from "next/image";
import SettingsModal from "../settings/settingsModal";
import SignOut from "./signOut";
export default function ProfileDropdown() {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <Image className="w-8 h-auto rounded-full" src={photo} alt="Maria" />
      
        <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
          Maria
        </span>
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] hidden duration hs-dropdown-open:opacity-100 opacity-0 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
        aria-labelledby="hs-dropdown-custom-trigger"
      >
        <a
          href="/profile"
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
        >
          Profile
        </a>
        <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
          <button data-hs-overlay="#hs-bg-gray-on-hover-cards">Settings</button>
        </div>
        <div
          id="hs-bg-gray-on-hover-cards"
          className="hs-overlay hidden w-full h-full fixed top-0 start-0 overflow-x-hidden overflow-y-auto pointer-events-none"
        >
          <SettingsModal />
        </div>
        <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
          <SignOut />
          <svg
            className="flex-shrink-0 w-4 h-4 cursor pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}
