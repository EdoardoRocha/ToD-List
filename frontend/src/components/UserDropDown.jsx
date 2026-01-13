import "./UserDropDown.css";
import { ChevronDown } from "lucide-react";
import UserAvatar from "./gravatar/UserAvatar";

export default function UserDropDown(props) {
  return (
    <div className="userDropDown">
      <div className="userButton">
        <span className="hidden sm:block">Edoardo Paz</span>
        <div className="userDropDownImg">
          <UserAvatar email="pazedoardo@gmail.com" size="40"/>
        </div>
        <ChevronDown size={16} className="text-white-500 ml-6 iconDropDown" />
      </div>
    </div>
  );
}
