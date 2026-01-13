import "./Header.css";
import UserDropDown from "./userDropDown";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header(props) {
  const [statusText, setStatusText] = useState("Verificando...");

  useEffect(() => {
    async function checkHealth() {
      try {
        const url = "http://54.207.61.243:3000/health";
        const response = await axios(url);
        const responseStatus = response.data.status;
        setStatusText(responseStatus);
      } catch (e) {
        setStatusText("Offline 🔴");
        toast.error("Servidor backend desconectado");
      }
    }

    checkHealth();
  }, []);

  return (
    <header className="header">
      <div className="status flex items-center ">
        <span className="uppercase ">
          Sistema: {statusText}
        </span>
      </div>
      <div className="userDropdown">
        <UserDropDown />
      </div>
    </header>
  );
}
