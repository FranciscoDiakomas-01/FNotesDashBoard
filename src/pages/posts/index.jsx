import './index.css'
import { useState, useEffect } from 'react';
import { FaSearch, FaCalendar, FaRegTrashAlt, FaRegEdit, FaDownload } from 'react-icons/fa';
import { getPosts } from '../../services/posts';
export default function Posts() {
    const [Posts, setPosts] = useState([])
    const [Comments, setComments] = useState([]);
    const [page , setpage] = useState(1)
    const [activePost , setActivePost] = useState()
    const [details , setDetails] = useState(false)
    const [update , setUpdate ] = useState(false)
    const [pagination ,setPagination] = useState([])
    async function GetComments(id) {
      console.log(id)
      setComments([
        {
          userName: "Teste Miguel",
          userEmail: "Teste@gmail.com",
          content: "Pesquise pelo nome do título da postagem",
        },
        {
          userName: "Teste Miguel",
          userEmail: "Teste@gmail.com",
          content: "Pesquise pelo nome do título da postagem",
        },
        {
          userName: "Teste Miguel",
          userEmail: "Teste@gmail.com",
          content: "Pesquise pelo nome do título da postagem",
        },
      ]);
      return
      
    }
    useEffect(() => {
        async function get() {
          const posts = await getPosts(page, 8)
          setPosts(posts.data);
          setPagination((prev) => ({
            ...prev,
            lastpage: posts.lastPage,
            total: posts.total,
            currentPage: posts.currentPage,
          }));
      }
      get()
    },[page])
 return (
   <section id="Posts">
     <form>
       <button
         type="button"
         onClick={() => {
           if (page == 1) {
             setpage(pagination.lastpage);
             return;
           } else {
             setpage((prev) => prev - 1);
           }
         }}
       >
         {"<"}
       </button>
       <div>
         <input placeholder="Pesquise pelo nome do título da postagem" />
         <FaSearch />
       </div>
       <button
         type="button"
         onClick={() => {
           if (pagination.lastpage > pagination.currentPage) {
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
       {details && (
         <aside>
           {update ? (
             <div>
               <form id="updatePostForm">
                 <article>
                   <label htmlFor="title">Título</label>
                   <input
                     placeholder="Entre com o título da postagem"
                     name="title"
                     id="title"
                   />
                   <label htmlFor="category">Categoria</label>
                   <select id="category" name="category">
                     <option>Selecione Uma Categoria</option>
                   </select>
                   <label htmlFor="description">Descrição</label>
                   <textarea
                     placeholder="Descrição do post"
                     name="description"
                     id="description"
                   />
                   <span>
                     <button>Salvar</button>
                     <button
                       type="reset"
                       onClick={() => {
                         setUpdate(false);
                       }}
                     >
                       Cancelar
                     </button>
                   </span>
                 </article>
                 <aside>
                   <img />
                   <p>Clique Para Alterar a Imagem</p>
                   <input type="file" />
                 </aside>
               </form>
             </div>
           ) : (
             <div>
               <main>
                 <div>
                   {
                     //verificar se existe um cover no post
                     Posts[activePost]?.cover && (
                       <img src={Posts[activePost]?.cover} />
                     )
                   }

                   <h1>{Posts[activePost]?.title}</h1>
                   <div>
                     <FaCalendar />
                     <p>{Posts[activePost]?.created_at}</p>
                   </div>
                   <p>{Posts[activePost]?.description}</p>
                   <footer>
                     <button
                       onClick={() => {
                         setDetails(false);
                       }}
                     >
                       x
                     </button>
                     <button
                       onClick={() => {
                         setUpdate(true);
                       }}
                     >
                       <FaRegEdit />
                     </button>
                     <button
                       onClick={() => {
                         const delted = window.confirm("Deseja eliminar?");

                         if (delted) {
                           alert("Eliminado");
                           return;
                         }
                       }}
                     >
                       <FaRegTrashAlt />
                     </button>
                     <a download href={Posts[activePost]?.cover}>
                       <FaDownload />
                     </a>
                   </footer>
                 </div>
                 <aside>
                   <h2>Comentários</h2>
                   {Comments.length > 0 ? (
                     Comments.map((cm, index) => (
                       <figure key={index}>
                         <header>
                           <span>{cm.userName?.slice(0, 2)}</span>
                           <div>
                             <strong>{cm.userName}</strong>
                             <i>{cm.userEmail}</i>
                           </div>
                         </header>

                         <p>{cm.content}</p>
                       </figure>
                     ))
                   ) : (
                     <strong>Nenhum Comentário</strong>
                   )}
                 </aside>
               </main>
             </div>
           )}
         </aside>
       )}
       {Posts.map((post, index) => (
         <figure
           key={index}
           onClick={async () => {
             setActivePost(index);
             setDetails(true);
             await GetComments(index);
           }}
         >
           <img src={post.cover} />
           <span>
             <h1>{post.title?.toString().slice(0, 30)} ...</h1>
             <div>
               <FaCalendar />
               <p>10/11/2024</p>
             </div>
           </span>
         </figure>
       ))}
     </article>
     <button>+</button>
     <span>
       <p>
         {page} de {pagination.lastpage}
       </p>
     </span>
   </section>
 );
}