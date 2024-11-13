import './index.css'
import { useState, useEffect } from 'react';
import { FaSearch, FaCalendar, FaRegTrashAlt, FaRegEdit, FaDownload } from 'react-icons/fa';
import { getPosts, getCommentByPOstId, deletePostById , PostCreate } from '../../services/posts';
import { toast } from 'react-toastify';
import { getAllCategory } from '../../services/category';
export default function Posts() {
    const [Posts, setPosts] = useState([])
    const [Comments, setComments] = useState([]);
    const [page , setpage] = useState(1)
    const [activePost , setActivePost] = useState()
    const [details , setDetails] = useState(false)
    const [update , setUpdate ] = useState(false)
    const [pagination ,setPagination] = useState([])
    const [add , setAdd] = useState(false)
    const [cover , setCover] = useState()
    const [reload , setReload] = useState(false)
    const [category , setcategory]  = useState([])
  async function CreatePost(post) {
      const formdata = new FormData()
      formdata.append("file" , post.file)
      formdata.append("title" , post.title);
      formdata.append("categoryId", post.categoryId);
      formdata.append("description", post.description);
      const response = await PostCreate(formdata)
      console.log(response)
      setpage(1)
    }
  const [post, setPost] = useState({
    title: "",
    description: "",
    categoryId: "",
    file: "",
  });
  async function GetComments(id) {
        const response = await getCommentByPOstId(id)
        setComments(response.data)
        return
        
      }
    useEffect(() => {
        async function get() {
          const posts = await getPosts(page, 8)
          const response = await getAllCategory()
          setcategory(response)
          setPosts(posts.data);
          setPagination((prev) => ({
            ...prev,
            lastpage: posts.lastPage,
            total: posts.total,
            currentPage: posts.currentPage,
          }));
      }
      get()
    },[page , reload])
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
                       onClick={async () => {
                         const delted = window.confirm("Deseja eliminar?");
                         if (delted) {
                           const response = await deletePostById(
                             Posts[activePost].postid
                           );
                           if (response) {
                             setDetails(false);
                             toast.success("Deletado com Sucesso!");

                             setTimeout(() => {
                               setReload(prev => !prev)
                             },100)
                             return 
                           } else {
                             return toast.error("Erro ao deletar!");
                           }
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
                   {Array.isArray(Comments) && Comments.length > 0 ? (
                     Comments.map((cm, index) => (
                       <figure key={index}>
                         <header>
                           <span>{cm.username?.slice(0, 2)}</span>
                           <div>
                             <strong>{cm.username}</strong>
                             <i>{cm.useremail}</i>
                           </div>
                         </header>

                         <p>{cm.commentcontent}</p>
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
             await GetComments(post.postid);
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
     <button
       onClick={() => {
         setCover("");
         setAdd((prev) => !prev);
       }}
     >
       {add ? "-" : "+"}
     </button>
     {add && (
       <section id="addPost">
         <form id="updatePostForm">
           <article>
             <label htmlFor="title">Título</label>
             <input
               placeholder="Entre com o título da postagem"
               name="title"
               id="title"
               required
               onChange={(e) => {
                 setPost((prev) => ({ ...prev, title: e.target.value }));
               }}
             />
             <label htmlFor="category">Categoria</label>
             <select
               required
               id="category"
               name="category"
               onChange={(e) => {
                 setPost((prev) => ({ ...prev, categoryId: e.target.value }));
               }}
             >
               <option value={0}>Selecione Uma Categoria</option>
               {category.map((c) => (
                 <option key={c.id} value={c.id}>
                   {c.title}
                 </option>
               ))}
             </select>
             <label htmlFor="description">Descrição</label>
             <textarea
               placeholder="Descrição do post"
               name="description"
               id="description"
               onChange={(e) => {
                 setPost((prev) => ({ ...prev, description: e.target.value }));
               }}
             />
             <span>
               <button
                 onClick={async (e) => {
                   e.preventDefault();
                   await CreatePost(post);
                 }}
               >
                 Salvar
               </button>
               <button
                 type="reset"
                 onClick={() => {
                   setCover("");
                   setAdd(false);
                 }}
               >
                 Cancelar
               </button>
             </span>
           </article>
           <aside>
             {cover && <img src={cover} />}
             <p>
               {cover
                 ? "Clique Para Alterar a Imagem"
                 : "Clique Para Adicionar uma Imagem"}
             </p>
             <input
               type="file"
               onChange={(e) => {
                 setPost((prev) => ({ ...prev, file: e.target.files[0] }));
                 setCover(window.URL.createObjectURL(e.target.files[0]));
               }}
             />
           </aside>
         </form>
       </section>
     )}
     <span>
       <p>
         {page} de {pagination.lastpage || 0}
       </p>
     </span>
   </section>
 );
}