

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