import './index.css'
import img from '../../assets/img/mortarboard.png'

import { LuLayoutGrid } from "react-icons/lu";
export default function DashBoard() {

  const data = [
    {
      total: 20,
    },
    {
      total: 40,
    },
    {
      total: 20,
    },
    {
      total: 10,
    },
  ];
 return (
   <section id="dashboard">
     <article>
       <aside>
         <span>
           <h1>Bem Vindo Ao Painel de Adminitador</h1>
           <p>Funalo</p>
           <i>fulano@gmail.com</i>
           <button>Criar novo Post</button>
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
       {
         data.map((dt , index) => (
          <div key={index}>
             <h1>
               {
                 index == 0 ? 'Total Usuários' : index == 1 ? 'Total Postagens' : index == 2  ? 'Total Categorias' : 'Total Comentários'
               }
             </h1>
             <p>
               {dt.total}
             </p>
             <LuLayoutGrid/>
          </div>
        ))
       }
     </aside>
   </section>
 );
}