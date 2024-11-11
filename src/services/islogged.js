export default async function isLogged(){
    const token = localStorage.getItem("token")
    //sennd tokem to server to verify if is admin or not
    if (token == null) {
        return false
    } else {
        const API = await fetch(`http://localhost:8080/isAdmin/${token}`);
        const response = await API.json()
        if (response.response == true) {
            return true
        } else {
            return false
        }
    }
}