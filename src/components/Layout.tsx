import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-heritage">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};