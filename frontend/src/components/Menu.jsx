import "./Menu.css";
import MenuItens from "./menuItens/MenuItens";
import MenuFooter from "./menuItens/MenuFooter";

export default function Menu() {
  return (
    <div className="menu flex h-screen bg-gray-50">
      {/* MENU LATERAL: Escondido no mobile, visível no desktop */}
      <aside className="hidden md:flex flex-col  bg-white border-r border-gray-200">
        <div className="p-4 font-bold text-blue-600 text-xl text-center">ToDóList</div>
        <MenuItens />
      </aside>
      <aside className="menuMobile md:hidden">
        <MenuItens />
      </aside>
    </div>
  );
}
