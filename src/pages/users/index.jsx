import './index.css'
import { useState, useEffect } from 'react';
import { getUsers , deleteUserById } from '../../services/user';
import { toast } from 'react-toastify';
export default function Users() {
  const [users, setUsers] = useState([])
  const [reload , setReload] = useState(false)
  const [pagination, setPagination] = useState({
      laspage: 0,
      currentPage : 0
    });
    const [page , setpage] = useState(1)
    useEffect(() => {
      async function getOrSet() {
        const response = await getUsers(page, 10);
        setUsers(response.data);
        if (response.data?.length == 0) {
          toast.info("Nenhum Usuário!");
        }
        setPagination((prev) => ({
          ...prev,
          currentPage: response.currentPage,
          laspage: response.lastPage,
        }));
      }
      getOrSet();
    }, [page, reload]);
 return (
   <section id="users">
     <form>
       <button
         type="button"
         onClick={() => {
           if (page == 1) {
             setpage(pagination.laspage);
             return;
           } else {
             setpage((prev) => prev - 1);
             return;
           }
         }}
       >
         {"<"}
       </button>
       <button
         type="button"
         onClick={() => {
           if (pagination.laspage > page) {
             setpage((prev) => prev + 1);
             return;
           } else {
             setpage(1);
             return;
           }
         }}
       >
         {">"}
       </button>
     </form>
     <article>
       { Array.isArray(users) && users.map((user) => (
         <figure key={user.id}>
           <span>
             {user.name[0]?.toUpperCase() + user.name.slice(1,3)}{" "}
           </span>
           <p>{user.name}</p>
           <p>{user.email}</p>
           <button
             onClick={async (e) => {
               e.preventDefault();
               const response = await deleteUserById(user.id);
               if (response) {
                 toast.success("Deletedo com sucesso!");
                 setReload((prev) => !prev);
                 return;
               } else {
                 return toast.error("Erro ao deletar!");
               }
             }}
           >
             Remover
           </button>
         </figure>
       ))}
     </article>
     <span>
       {pagination.currentPage} de {pagination.laspage}
     </span>
   </section>
 );
}