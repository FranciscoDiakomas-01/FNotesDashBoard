import './index.css'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getUsers } from '../../services/user';
import { toast } from 'react-toastify';
export default function Users() {
    const [users, setUsers] = useState([])
    const [page , setpage] = useState(1)
    useEffect(() => {
        async function getOrSet() {
          const response = await getUsers(page, 8)
          setUsers(response.data)
          if (response.data?.length == 0) {
            toast.info("Nenhum Usuário!")
          }
      }
      getOrSet()
        setpage(1)
    },[page])
 return (
   <section id="users">
     <form>
       <button>{"<"}</button>
       <div>
         <input placeholder="Pesquise pelo nome do usuário" />
         <FaSearch />
       </div>
       <button>{">"}</button>
     </form>
     <article>
       {users.map((user ,index) => (
         <figure key={index}>
           <span>{user.name?.toString().slice(0, 2)}</span>
           <p>{user.name}</p>
           <p>{user.email}</p>
           <button>Remover</button>
         </figure>
       ))}
     </article>
   </section>
 );
}