import { useState } from "react";
import NavBar from "./components/navbar";

function App() {
  const [message, setMessage] = useState("Hi 👋");

  async function onClick() {
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/api")
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div>
      <div>
      <NavBar />
      </div>
      <div>
        <button onClick={onClick}>
          Message is "<i>{message}</i>"
        </button>
      </div>
    </div>
  );
}

export default App;