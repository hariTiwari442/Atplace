import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const NavRootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavRootLayout;
