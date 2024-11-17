
export async function getAllCategory(page, limit = 6) {
  const API = await fetch(`http://localhost:8080/category?limit=${limit}&page=${page}`, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

  const response = await API.json();
    return response
}

export async function deleteCategory(id) {
  const API = await fetch(`http://localhost:8080/category/`+id, {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  const response = await API.json();
    if (response?.data == 'deleted') {
      return true
    } else {
        return false
  }
}


export async function updateCategory( body ) {
  const API = await fetch(`http://localhost:8080/category/` + body.id, {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
      method: "PUT",
    body : JSON.stringify(body)
  });

    const response = await API.json();
  if (response?.data == "updated") {
    return true;
  } else {
    return false;
  }
}


export async function createCategory(body) {
  const API = await fetch(`http://localhost:8080/category`, {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const response = await API.json();
  if (response?.data) {
    return true;
  } else {
    return false;
  }
}