import './index.css'
import { FaSearch , FaRegTrashAlt } from 'react-icons/fa';
import { useState , useEffect } from 'react';
export default function Comment() {
    const [comment, setComment] = useState([])
    const [posts, setPosts] = useState()
    useEffect(() => {
    }, [])
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
         Array.isArray(comment) ?
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
         )) : 'Po'
        }
     </article>
   </section>
 );
}