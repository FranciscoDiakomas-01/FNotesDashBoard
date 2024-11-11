import './index.css'
import img from '../../assets/img/FB_IMG_17294263243518244.jpg'
import img2 from '../../assets/img/FB_IMG_17296759522737703.jpg'
import { useState, useEffect } from 'react';
import { FaSearch , FaCalendar , FaRegTrashAlt , FaRegEdit ,FaDownload } from 'react-icons/fa';
export default function Posts() {
    const [Posts, setPosts] = useState([])
    const [Comments, setComments] = useState([]);
    const [page , setpage] = useState(1)
    const [activePost , setActivePost] = useState()
    const [details , setDetails] = useState(false)
    const [update , setUpdate ] = useState(false)
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
        setPosts([
          {
            title: "Teste do Titulo do meu Post",
            status: 1,
            id: 1,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste Tudo que voce precisa saber sobre o mundo das xxx",
            status: 1,
            id: 2,
            cover: img2,
            created_at: "12/11/2024",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ad velit, cupiditate quasi ipsum porro laborum ratione eos temporibus consectetur. Eos praesentium odit distinctio at? Ab saepe ipsa expedita iste?Tudo que voce precisa saber sobre o mundo das xxxxxxxLorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ad velit, cupiditate quasi ipsum porro laborum ratione eos temporibus consectetur. Eos praesentium odit distinctio at? Ab saepe ipsa expedita iste?Tudo que voce precisa saber sobre o mundo das xxxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 3,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 4,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 1,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 1,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 1,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
          {
            title: "Teste",
            status: 1,
            id: 1,
            cover: img,
            created_at: "12/11/2024",
            description:
              "Tudo que voce precisa saber sobre o mundo das xxxxxxxx",
          },
        ]);
        setpage(1)
    },[page])
 return (
   <section id="Posts">
     <form>
       <button>{"<"}</button>
       <div>
         <input placeholder="Pesquise pelo nome do título da postagem" />
         <FaSearch />
       </div>
       <button>{">"}</button>
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
   </section>
 );
}