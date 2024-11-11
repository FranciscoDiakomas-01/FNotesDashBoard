import './index.css'
import { useState , useEffect } from 'react';
import { createCategory, getAllCategory } from "../../services/category";
import { deleteCategory , updateCategory } from '../../services/category';
import { toast } from 'react-toastify';
export default function Category() {
  const [category, setCategory] = useState([])
  const [reload, setReload] = useState(false);
  const [add, setAdd] = useState(false)
  const [updateBody, setUpdateBody] = useState({
    title: "",
    description: "",
    id : 0
  })
  const [edit, setEdit] = useState(false);
    useEffect(() => {
      async function getAll() {
        const response = await getAllCategory()
        setCategory(response)
      }
      getAll()
    }, [reload]);
    return (
      <section id="category">
        {add && (
          <aside>
            <form>
              <h2>Cadastro</h2>
              <label>Título</label>
              <input
                required
                placeholder="Entre com o Titulo"
                onChange={(e) => {
                  setUpdateBody((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
              <label>Descrição</label>
              <input
                placeholder="Entre com o Titulo (opcional)"
                onChange={(e) => {
                  setUpdateBody((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
              <div>
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await createCategory(updateBody)
                    if (response) {
                      setReload((prev) => !prev);
                      toast.success("Cadastrado Com Sucesso!!");
                      return;
                    } else {
                      toast.error("Essa Categoria Já existe");
                      return;
                    }
                  }}
                >
                  Cadastrar
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setAdd(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </aside>
        )}

        {edit && (
          <aside>
            <form>
              <h2>Edição</h2>
              <label>Título</label>
              <input
                required
                placeholder="Entre com o Titulo"
                value={updateBody.title}
                onChange={(e) => {
                  setUpdateBody((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
              <label>Descrição</label>
              <input
                placeholder="Entre com o Titulo (opcional)"
                value={updateBody.description}
                onChange={(e) => {
                  setUpdateBody((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
              <div>
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await updateCategory(updateBody);
                    if (response) {
                      setReload((prev) => !prev);
                      toast.info("Salvo com Sucesso!");
                      return;
                    } else {
                      toast.error("Erro ao Salvar");
                      return;
                    }
                  }}
                >
                  Salvar
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </aside>
        )}
        {category.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Descrição</td>
                <td>Data</td>
                <td>Remoção</td>
                <td>salvar</td>
              </tr>
            </thead>
            <tbody>
              {category.length > 0 &&
                category.map((ct, index) => (
                  <tr key={ct.id}>
                    <td>{ct.title}</td>
                    <td>{ct.description}</td>
                    <td>{ct.created_at}</td>
                    <td>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          const response = await deleteCategory(ct.id);
                          if (response) {
                            setReload((prev) => !prev);
                            return toast.success("Deletedado Com Sucesso!");
                          } else {
                            return toast.error("Erro ao Deleter!");
                          }
                        }}
                      >
                        Del
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setUpdateBody((prev) => ({
                            ...prev,
                            title: category[index]?.title,
                            description: category[index]?.description,
                            id: category[index]?.id,
                          }));
                          setEdit(true);
                        }}
                      >
                        Actualizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <h1>Nenhuma Categoria Cadastrada</h1>
        )}
        <button
          onClick={() => {
            setAdd(true);
          }}
        >
          +
        </button>
      </section>
    );
}