

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