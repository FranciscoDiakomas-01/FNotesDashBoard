

export async function getPosts(page = 1, limit){

    const API = await fetch(`http://localhost:8080/posts?limit=${limit}&page=${page}`, {
        headers: {
            'authorization': localStorage.getItem("token"),
            'Content-Type' : 'application/json'
        }
    });

    const response = await API.json()
    return response
}

export async function getPostsById(id) {
  const API = await fetch(`http://localhost:8080/posts/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const response = await API.json();
  return response;
}

export async function getCommentByPOstId(id) {
  const API = await fetch(`http://localhost:8080/commentsbyPost/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const response = await API.json();
  return response;
}

export async function deletePostById(id) {

    const API = await fetch(`http://localhost:8080/posts/${id}`, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
        },
        method : "DELETE"
    });
    const response = await API.json();
    if (response?.data == "deleted") {
        return true
    } else {
        return false
    }
}


export async function PostCreate(body) {
  const API = await fetch(`http://localhost:8080/post`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
    body: body,
    method: "POST",
  });

  const response = await API.json();
  console.log(response)
  if (response?.data) {
    return true
  } else {
    return false
  }
}


export async function UpdatePost(body) {
  
  const form = Object.fromEntries(body);
  const API = await fetch(`http://localhost:8080/post/${form.id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
    body: body,
    method: "PUT",
  });

  const response = await API.json();
  if (response?.data == "updated") {
    return true;
  } else {
    return false;
  }
}

