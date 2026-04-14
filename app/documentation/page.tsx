import SideMenu from "./sideMenu";

const page = () => {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <main className="flex-1 pt-14 p-4">
        <h1 className="title">documentation</h1>
        <div>
          <h1>Purpose</h1>
        </div>
      </main>
    </div>
  );
};

export default page;
