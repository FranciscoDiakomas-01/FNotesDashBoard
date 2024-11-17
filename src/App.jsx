import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { FaRegUser , FaPaperPlane } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { FiPieChart } from "react-icons/fi";
import { BiText } from "react-icons/bi";
import { useState , useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import isLogged from "./services/islogged";
export function App() {
  const [active, setActive] = useState(1)
  const [load, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {

    async function isLogg() {
      setLoading(true)
      const isAdmin = await isLogged();
      setTimeout(() => {
        if (isAdmin) {
          navigate("/");
        } else {
          navigate("/login");
        }
        return setLoading(false);
      }, 1500);
      
    }
    isLogg()
  }, [navigate]);
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
      path: "/category",
      id: 3,
      icon: <LuLayoutGrid />,
    },
    {
      name: "Postagens",
      path: "/posts",
      id: 5,
      icon: <BiText />,
    },
    {
      name: "Meu Perfil",
      path: "/profile",
      id: 4,
      icon: <FaPaperPlane />,
    },
  ];
  return (
    <>
      {
        load ? (
        
          <>
            <main id="loading">
              <p></p>
              <h1>Bem Vindo a <span>FNotes</span> </h1>
          </main>
          </>
        ): 
          <main id = "app">
      <ToastContainer></ToastContainer>
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
              <button onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
                navigate("/login")
        }}>
          <IoMdLogOut />
          <p>Sair</p>
        </button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
      }
    </>
    
  );
}
