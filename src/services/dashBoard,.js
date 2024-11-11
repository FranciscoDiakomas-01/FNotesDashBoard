
export default async function GetDashBoardData(){
    const token = localStorage.getItem("token")
    const API = await fetch("http://localhost:8080/dashboard", {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }
    });

    const response = await API.json()
    return response.data
}