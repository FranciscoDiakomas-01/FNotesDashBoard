import './index.css'
import { AdminLogin } from '../../services/getAdminData.js'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate()
  const [admin, setadmin] = useState({
    email: "",
    password: ""
  })
    return (
      <section id="login">
        <ToastContainer></ToastContainer>
        <article></article>
        <form>
          <h1>Bem Vindo a FNotes</h1>
          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            autoFocus
            onChange={(e) => {
              setadmin((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <label>Palavra-Passe</label>
          <input
            type="password"
            placeholder="sua senha"
            required onChange={(e) => {
              setadmin((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (admin.email.length == 0 || admin.password.length == 0) {
                return toast.error("Preencha Todos os Campos")
              }
              const response = await AdminLogin(admin);
              if (response) {
                toast.warn("Essa Conta não Existe!");
                navigate("/")
                return
              } else {
                toast.warn("Essa Conta não Existe!")
              }
            }}
          >
            Entrar
          </button>
        </form>
      </section>
    );
}