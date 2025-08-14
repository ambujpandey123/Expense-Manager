import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Hero } from "./components/Hero";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";


export default function App() {
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Hero /> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="*" element={ <NotFound /> } />
       
      </Routes>
    </BrowserRouter>

  )
}