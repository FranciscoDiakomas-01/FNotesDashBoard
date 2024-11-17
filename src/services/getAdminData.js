

export default async function getAdminData() {
    const API = await fetch("http://localhost:8080/user/1", {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : localStorage.getItem("token")
        }
    });
    const response = await API.json()
    return response.data
    
}

export async function AdminLogin(user) {
    const API = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response = await API.json()
    if (response?.isAdmin) {
        localStorage.setItem("token", response?.token)
        return true
    } else {
        localStorage.clear()
        sessionStorage.clear()
        return false;
    }
}


export async function updateAdmin(body) {
    const API = await fetch("http://localhost:8080/user", {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : localStorage.getItem("token")
        },
        method: 'PUT',
        body : JSON.stringify(body)
    });
    const response = await API.json()
    if (response?.data) {
        return true
    } else {
        return false
    }
}
