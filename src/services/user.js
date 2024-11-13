

export async function getUsers(page , limit){

    const API = await fetch(`http://localhost:8080/users?page=${page}&limit=${limit}`, {
        headers: {
            'authorization': localStorage.getItem("token"),
            'Content-Type' : 'application/json'
        }
    });

    const response = await API.json()
    return response
}


export async function deleteUserById(id){

    const API = await fetch(`http://localhost:8080/user/` + id, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const response = await API.json()
    if (response?.data) {
        return true
    } else {
        return false
    }
}