export default function Home() {
  return (
    <main className="h-screen border p-5 flex flex-col gap-3">
      <h2 className="text-5xl font-bold text-primary">Home Page</h2>
      <div className="grid sm:grid-cols-2 h-full gap-5 sm:px-1">
        {/* MyNote */}
        <div className="h-full space-y-2">
          <h3 className="text-2xl font-semibold px-1">My Note</h3>
          <div className="bg-primary h-[36rem] rounded-box overflow-scroll">
            <div className="menu menu-lg text-white">
            </div>
          </div>
        </div>
        {/* MyToDo */}
        <div className="h-full space-y-2">
          <h3 className="text-2xl font-semibold px-1">My ToDo</h3>
          <div className="bg-primary h-[36rem] rounded-box overflow-scroll">
            <div className="menu menu-lg text-white">
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
