import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser , FaPaperPlane } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { FiPieChart } from "react-icons/fi";
import { useState } from "react";
export function App() {
  const [active , setActive] = useState(1)
  const links = [
    {
      name: "Painel",
      path: "/",
      id: 1,
      icon: <FiPieChart />,
    },
    {
      name: "Usuários",
      path: "/users",
      id: 2,
      icon: <FaRegUser />,
    },
    {
      name: "Categorias",
      path: "/",
      id: 3,
      icon: <LuLayoutGrid />,
    },
    {
      name: "Comentários",
      path: "/",
      id: 4,
      icon: <FaPaperPlane />,
    },
    {
      name: "Configurações",
      path: "/",
      id: 5,
      icon: <IoSettingsOutline />,
    },
  ];
  return (
    <main id="app">
      <nav>
        <a>FNotes</a>
        <ol>
          {links.map((li) => (
            <Link
              key={li.id}
              to={li.path}
              onClick={() => {
                setActive(li.id);
              }}
              style={{
                backgroundColor: active == li.id ? "black" : "",
                color: active == li.id ? "white" : "",
                opacity: active == li.id ? 1 : 0.6
              }}
            >
              {li.icon}
              <p>{li.name}</p>
            </Link>
          ))}
        </ol>
        <button>
          <IoMdLogOut />
          <p>Sair</p>
        </button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
