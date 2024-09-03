import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import "../../components/Shared.css"

export default function RootLayout() {
  return (
    <>

      <div className="bg-image h-screen w-full">

        <MainNavigation />
        <Outlet />
        <Footer />
      </div>

    </>
  );
}
