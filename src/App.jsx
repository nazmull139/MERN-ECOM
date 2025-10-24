import { Outlet } from "react-router-dom";
import "./App.css";
import FacebookPixel from "./components/FacebookPixel";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {

  return(

    <>
    <FacebookPixel/>
    <Navbar/>
    <Outlet/>
    <Footer/>
  </>
  )
  
}

export default App;
