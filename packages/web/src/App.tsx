import { useState } from "react";
import NavBar from "./components/navbar";
import './index.css'

function App() {
  const [message, setMessage] = useState("Click Me!");

  async function onClick() {
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/api")
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div>
      <div className="my-4">
      <NavBar />
      </div>
      <div className="flex h-screen items-center justify-center ">
        <button className="text-white border hover:bg-white hover hover:text-[#00033b] ease-in-out duration-300 rounded-lg px-4 py-2" onClick={onClick}>
          "<i>{message}</i>"
        </button>
      </div>
    </div>
  );
}

export default App;