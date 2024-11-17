import './index.css'
import { useState, useEffect } from 'react';
import { FaCalendar, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { getPosts, getCommentByPOstId, deletePostById , PostCreate, getPostsById, UpdatePost } from '../../services/posts';
import { toast } from 'react-toastify';
import { getAllCategory } from '../../services/category';
import { deleteComment } from '../../services/comment';
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
    const [category, setcategory] = useState([])

  async function getPostByIdToUpdate(id) {
    const response = await getPostsById(id)
    setPost((prev) => ({
      ...prev,
      categoryId: response?.data[0]?.categoryid,
      description: response?.data[0]?.description,
      title: response?.data[0]?.title,
      id: response?.data[0]?.id,
      file: response?.data[0]?.cover,
    }));
    setCover(response?.data[0]?.cover);
  }
  async function CreatePost(post) {
    const formdata = new FormData()
    console.log(post)
      formdata.append("file" , post.file)
      formdata.append("title" , post.title);
      formdata.append("categoryId", post.categoryId);
      formdata.append("description", post.description);
      const response = await PostCreate(formdata)
      if(response){
        toast.success("Postagem Criada!")
        setpage(1);
        setReload(prev => !prev)
        setAdd(false)
        return
      } else {
        toast.error("Erro ao criar Postagem");
        return
      }
  }
  async function UpdatePostById(post) {
    const formdata = new FormData();
    formdata.append("file", post.file);
    formdata.append("title", post.title);
    formdata.append("categoryId", post.categoryId);
    formdata.append("description", post.description);
    formdata.append('id', post.id)
    const response = await UpdatePost(formdata);
    if (response) {
      toast.success("Postagem Actualizada!");
      setpage(1);
      setReload(prev => !prev);
      setDetails(false)
      setUpdate(false)
      setAdd(false);
    } else {
      toast.error("Erro ao actualizar Postagem");
      return;
    }
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
          const response = await getAllCategory(0 , 0)
          setcategory(response?.data)
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
     {details && (
       <aside>
         {update ? (
           <section id="addPost">
             <form
               id="updatePostForm"
               method="put"
               encType="multipart/form-data"
             >
               <article>
                 <label htmlFor="title">Título</label>
                 <input
                   placeholder="Entre com o título da postagem"
                   name="title"
                   value={post.title}
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
                     setPost((prev) => ({
                       ...prev,
                       categoryId: e.target.value,
                     }));
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
                   value={post.description}
                   onChange={(e) => {
                     setPost((prev) => ({
                       ...prev,
                       description: e.target.value,
                     }));
                   }}
                 />
                 <span>
                   <button
                     onClick={async (e) => {
                       e.preventDefault();
                       await UpdatePostById(post);
                     }}
                   >
                     Salvar
                   </button>
                   <button
                     type="reset"
                     onClick={() => {
                       setCover("");
                       setUpdate(false);
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
                     setPost((prev) => ({
                       ...prev,
                       file: e.target.files[0],
                     }));
                     setCover(window.URL.createObjectURL(e.target.files[0]));
                   }}
                 />
               </aside>
             </form>
           </section>
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
                     onClick={async () => {
                       await getPostByIdToUpdate(Posts[activePost]?.postid);
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
                             setReload((prev) => !prev);
                           }, 100);
                           return;
                         } else {
                           return toast.error("Erro ao deletar!");
                         }
                       }
                     }}
                   >
                     <FaRegTrashAlt />
                   </button>
                 </footer>
               </div>
               <aside>
                 <h2>Comentários</h2>
                 {Array.isArray(Comments) && Comments.length > 0 ? (
                   Comments.map((cm) => (
                     <figure key={cm.commentid}>
                       <header>
                         <span>{cm.username?.slice(0, 2)}</span>
                         <div>
                           <strong>{cm.username}</strong>
                           <i>{cm.useremail}</i>
                         </div>
                       </header>
                       <button onClick={ async () => {
                         const confirmation = window.confirm("Deseja Eliminar?")
                         if (confirmation) {
                            const response = await deleteComment(cm.commentid)
                            console.log(response)
                           if (response?.data == "deleted") {
                             setDetails(false);
                             toast.success("Comentário Eliminado!");
                             return;
                           } else {
                             toast.error("Erro ao Eliminar o Comentário!");
                             return
                           }
                        }
                        
                       }}>
                         <FaRegTrashAlt />
                       </button>
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
     <article>
       {Posts.map((post, index) => (
         <figure
           key={post.id}
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
               <p>{post?.created_at}</p>
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
         <form id="updatePostForm" method="post" encType="multipart/form-data">
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
               {Array.isArray(category) &&
                 category.map((c) => (
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