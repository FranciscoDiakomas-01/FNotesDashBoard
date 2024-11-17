import './index.css'
import { useState, useEffect } from 'react';
import  getAdminData , {updateAdmin} from '../../services/getAdminData';
import { toast } from 'react-toastify';


export default function Profile() {
    const [admin, setAdmin] = useState({})
    useEffect(() => {
        
        async function get() {
            const response = await getAdminData()
            
            setAdmin(response[0])
        }
        get()
    },[])
    return (
      <section id="profile">
        <form onSubmit={async(e) => {
                e.preventDefault()
                if (admin.name?.toString().length <= 2 || admin.email.toString().length == 0 || admin.password.toString().length <= 7) {
                    toast.warn("Email , Nome ou Passe Inválida!")
                    return
                }
                const response = await updateAdmin(admin)
                if (response) {
                    toast.success("Perfil Alterado Com Sucesso!")
                    return
                }else {
                  toast.error("Erro ao Alterar o Perfil!");
                  return;
                }
        }}>
          <article></article>
          <label htmlFor="name">Nome</label>
          <input
            placeholder="Seu nome"
            name="name"
            id="name"
            required
            value={admin?.name}
            onChange={(e) => {
              setAdmin((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            placeholder="exemplo@gmail.com"
            name="email"
            id="email"
            type="email"
            required
            value={admin?.email}
            onChange={(e) => {
              setAdmin((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <label htmlFor="password">Palavra Passe</label>
          <input
            placeholder="password"
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => {
              setAdmin((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <div>
            <button type='submit'>Atualizar</button>
            <button type='reset'>Cancelar</button>
          </div>
        </form>
      </section>
    );
}