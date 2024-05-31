import ListLinks from "./components/ListLinks";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-fit lg:h-screen p-5 flex flex-col gap-3">
      <div className="flex items-center justify-end lg:justify-between">
        <h2 className="text-5xl font-bold text-primary max-lg:hidden">
          🏠Home Page
        </h2>
        <div className="lg:tooltip lg:tooltip-left lg:tooltip-primary"  data-tip="My Planner">
          <Link href="/planner" className="btn lg:btn-square btn-primary">
            <i className="fa-solid fa-calendar-days text-xl sm:text-2xl"></i>
            <span className="sm:text-xl lg:hidden">My Planner</span>
          </Link>
        </div>
      </div>
      <div className="flex max-xl:flex-col h-[45%] xl:h-[85%] gap-5 sm:px-1">
        {/* MyNote */}
        <div className="xl:w-full h-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold px-1">📖 My Note</h3>
          <div className="bg-primary rounded-box overflow-y-scroll xl:min-h-full h-[30rem]">
            <ListLinks type="Note" />
          </div>
        </div>
        {/* MyToDo */}
        <div className="xl:w-full h-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold px-1">📝 My ToDo</h3>
          <div className="bg-primary rounded-box overflow-y-scroll xl:min-h-full h-[30rem]">
            <ListLinks type="ToDo" />
          </div>
        </div>
      </div>
    </div>
  );
}
