import './index.css'
import img from '../../assets/img/mortarboard.png'
import { useContext, useEffect , useState } from 'react';
import { LuLayoutGrid } from "react-icons/lu";
import { UserContext } from '../../context/userContext'
import GetDashBoardData from '../../services/dashBoard,';
export default function DashBoard() {
  const { user } = useContext(UserContext);
  const [ data , setData ] = useState([])
  useEffect(() => {
    async function getDashBoard() {
      const response = await GetDashBoardData()
      setData(response)
    }
    getDashBoard()
  }, []);
  
 return (
   <section id="dashboard">
     <article>
       <aside>
         <span>
           <h1>Bem Vindo Ao Painel de Adminitador</h1>
           <p>{user[0]?.name}</p>
           <i>{user[0]?.email}</i>
           <button>Meu Perfil</button>
         </span>
         <img src={img} alt={img} />
       </aside>
       <span>
         <i></i>
         <div>
           <h2>Domingo</h2>
           <p>12 : 20 : 23</p>
           <p>12 / 20 / 2023</p>
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