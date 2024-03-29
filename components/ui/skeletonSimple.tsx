export default function SkeletonSimple() {
  return (
    <>
      <h3
        className="h-4 w-2/5 bg-deep-teal-400 rounded-full dark:bg-gray-700"
      ></h3>

      <ul className="mt-5 space-y-3">
        <li className="w-full h-4 bg-deep-teal-400 rounded-full dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-deep-teal-400 rounded-full dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-deep-teal-400 rounded-full dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-deep-teal-400 rounded-full dark:bg-gray-700"></li>
      </ul>
    </>
  );
}
