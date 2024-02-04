import Navbar from "@/app/u/_components/navbar";
import NewSidebar from "@/app/u/_components/newSidebar";
import Footer from "../footer";
import { Hero } from "../hero/hero";

export default function NewGrid() {
  return (
    <>

<div className="grid grid-cols-[0.6fr_1.4fr_1fr] grid-rows-[0.3fr_2.5fr_0.2fr] gap-0 min-h-screen">
  <div className="col-start-1 col-end-2 row-start-1 row-end-4 bg-blue-500"><NewSidebar/></div>
  <div className="col-start-1 col-end-4 row-start-1 row-end-2 bg-red-500"><Navbar/></div>
  <div className="col-start-1 col-end-4 row-start-2 row-end-3 bg-yellow-500"><Hero/></div>
  <div className="col-start-1 col-end-4 row-start-3 row-end-4 bg-green-500"><Footer/></div>
</div>


    </>
  );
}
