import './index.css'
import { FaSearch , FaRegTrashAlt } from 'react-icons/fa';
import { useState , useEffect } from 'react';
export default function Comment() {
    const [comment, setComment] = useState([])
    useEffect(() => {
        setComment([
          {
            userName: "teste da silva",
            userEmail: "teste@gmail.com",
            content: "eu adoro muito os seus conteudos",
          },
          {
            userName: "teste da silva",
            userEmail: "teste@gmail.com",
            content: "eu adoro muito os seus conteudos",
          },
          {
            userName: "teste da silva",
            userEmail: "teste@gmail.com",
            content: "eu adoro muito os seus conteudos",
          },
          {
            userName: "teste da silva",
            userEmail: "teste@gmail.com",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus magni incidunt blanditiis quam fugit eveniet corporis dolor facere quaerat nihil, rem accusantium itaque ea vitae eligendi. Illo quam et esse? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorem at reprehenderit voluptatum vero illum tenetur consequatur ab non nisi laboriosam aspernatur molestias.",
          },
          {
            userName: "teste da silva",
            userEmail: "teste@gmail.com",
            content: "eu adoro muito os seus conteudos",
          },
          
        ]);
    },[])
 return (
   <section id="comment">
     <form>
       <select>
         <option>Filtre por Postagem</option>
       </select>
       <button>
         <FaSearch />
       </button>
     </form>
     <article>
       {comment.length > 0 &&
         Array.isArray(comment) &&
         comment.map((cm, index) => (
           <figure key={index}>
             <span>
               <p>{cm?.userName?.slice(0, 2).toUpperCase()}</p>
               <strong>{cm?.userName}</strong>
               <i>{cm?.userEmail}</i>
             </span>
             <figcaption>
               <p>{cm?.content}</p>
               <button>
                 <FaRegTrashAlt />
               </button>
             </figcaption>
           </figure>
         ))}
     </article>
   </section>
 );
}