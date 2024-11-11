import './index.css'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
export default function Users() {
    const [users, setUsers] = useState([])
    const [page , setpage] = useState(1)
    useEffect(() => {
        
        setUsers([
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
          {
            name: "Teste",
            email: "teste@gmail.com",
            status: 1,
            id: 1,
          },
        ]);
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
       {users.map((user) => (
         <figure key={user.id}>
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