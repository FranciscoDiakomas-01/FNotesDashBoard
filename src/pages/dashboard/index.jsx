import './index.css'
import img from '../../assets/img/mortarboard.png'
import {  useEffect , useState } from 'react';
import { LuLayoutGrid } from "react-icons/lu";
import getAdminData from '../../services/getAdminData';
import GetDashBoardData from '../../services/dashBoard,';
import Hours from '../../services/hours';
export default function DashBoard() {
  const [ data , setData ] = useState([])
  const [user, setUser] = useState([])
  const [date, setDate] = useState({
    time: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
    day: "0",
    dayWeek: "0",
    year:'2024'
  });
  useEffect(() => {
    async function getDashBoard() {
      const response = await GetDashBoardData()
      const response1 = await getAdminData()
      setUser(response1)
      setData(response)
    }
    const timeout = setInterval(() => {
      setDate(Hours())
    },1000)
    getDashBoard()
    return () => {
      clearInterval(timeout)
    }
  }, []);
  
 return (
   <section id="dashboard">
     <article>
       <aside>
         <span>
           <h1>Bem Vindo Ao Painel de Administrador</h1>
           {Array.isArray(user) && user.length > 0 && (
             <>
               <p>{user[0]?.name}</p>
               <i>{user[0]?.email}</i>
             </>
           )}
           <button>Meu Perfil</button>
         </span>
         <img src={img} alt={img} />
       </aside>
       <span>
         <i></i>
         <div>
           <h2>{date?.dayWeek}</h2>
           <p>
             {date?.hours +
               " : " +
               date?.minutes?.toString()?.padStart(1, "0") +
               " : " +
               date?.seconds?.toString()?.padStart(1, "0")}
           </p>
           <p>{date?.day + " : " + date?.year}</p>
         </div>
       </span>
     </article>

     <aside>
       {data.map((dt, index) => (
         <div key={index}>
           <h1>
             {index == 0
               ? "Total Usuários"
               : index == 1
               ? "Total Postagens"
               : index == 2
               ? "Total Categorias"
               : "Total Comentários"}
           </h1>
           <p>{dt.total}</p>
           <LuLayoutGrid />
         </div>
       ))}
     </aside>
   </section>
 );
}