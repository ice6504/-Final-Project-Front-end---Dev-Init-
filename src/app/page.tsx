export default function Home() {
  return (
    <div className="h-fit lg:h-screen p-5 flex flex-col gap-3">
      <h2 className="text-5xl font-bold text-primary max-lg:hidden">
        Home Page
      </h2>
      <div className="flex max-xl:flex-col h-[45%] xl:h-[85%] gap-5 sm:px-1">
        {/* MyNote */}
        <div className="xl:w-full h-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold px-1">
            My Note
          </h3>
          <div className="bg-primary rounded-box overflow-y-scroll xl:min-h-full h-[30rem]">
            <div className="menu menu-lg text-white">
            </div>
          </div>
        </div>
        {/* MyToDo */}
        <div className="xl:w-full h-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold px-1">
            My ToDo
          </h3>
          <div className="bg-primary rounded-box overflow-y-scroll xl:min-h-full h-[30rem]">
            <div className="menu menu-lg text-white">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
