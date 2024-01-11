export default function DeleteAccount(){
    return <div className="mt-5 flex">
    <button
      type="button"
      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Delete account{" "}
    </button>
  </div>
}