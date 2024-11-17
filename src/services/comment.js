

export async function getAllCommentByPostId(id) {
    const token = localStorage.getItem("token");
    const API = await fetch("http://localhost:8080/commentsbyPost/"+id, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json()
    console.log(response);
}


export async function deleteComment(id) {
  const token = localStorage.getItem("token");
  const API = await fetch("http://localhost:8080/comment/" + id, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    method : 'DELETE'
  });
  const response = await API.json();
  return response
}