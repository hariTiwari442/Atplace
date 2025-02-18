import "./App.css";
import FeatureList from "./components/Featurecardlist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavRootLayout from "./components/NavRootElement";
import HomePage from "./pages/Home";
import Contact from "./pages/Contact";
import { LogIn, action as authAction } from "./pages/Auth";
import About from "./pages/About";
import AuthPage from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import { loader as DashBoardAction } from "./pages/DashBoard";
import { loader as ProfileLoader } from "./pages/Profile";

// const featureCardContent = {
//   key: 1,
//   title: "first",
//   icon: "➕",
//   description: "The first Card",
//   icondColor: "blue",
// };

//Children for . is Home
//About
//Contact
//Login
//Signuo
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavRootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/dashboard/:uid",
        element: <DashBoard />,
        loader: DashBoardAction,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/profile/:uid",
        element: <Profile />,
        loader: ProfileLoader,
      },
    ],
  },
  {},
]);

function App() {
  return (
    <RouterProvider router={router}>
      {/* <Navbar />
      <Hero />
      <FeatureList features={featureCardContent} />
      <Footer />
      <Hero /> */}
    </RouterProvider>
  );
}

export default App;
