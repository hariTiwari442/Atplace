import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

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
