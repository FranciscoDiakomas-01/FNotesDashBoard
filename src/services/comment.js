
export async function getAllCommentByPostId(id) {
    const token = localStorage.getItem("token");
    const API = await fetch("http://localhost:8080/comments?page=0&limit=0", {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json()
    console.log(response);
}