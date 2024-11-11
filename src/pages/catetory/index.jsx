import './index.css'
import { useState , useEffect } from 'react';
export default function Category() {
  const [category, setCategory] = useState([])
  const [page, setPage] = useState(1);
  const [add, setAdd] = useState(false)
  const [updateBody, setUpdateBody] = useState({
    title: "",
    description: "",
    id : 0
  })
  const [edit, setEdit] = useState(false);
    useEffect(() => {
        setPage(1)
        setCategory([
          {
            title: "Backend",
            id: 1,
            description: "PHP",
            created_at: "19/12/2024",
          },
          {
            title: "Backend",
            id: 1,
            description: "PHP",
            created_at: "19/12/2024",
          },
          {
            title: "Backend",
            id: 1,
            description: "PHP",
            created_at: "19/12/2024",
          },
        ]);
    }, [page]);
    return (
      <section id="category">
        {add && (
          <aside>
            <form>
              <h2>Cadastro</h2>
              <label>Título</label>
              <input required placeholder="Entre com o Titulo" />
              <label>Descrição</label>
              <input placeholder="Entre com o Titulo (opcional)" />
              <div>
                <button type="submit">Salvar</button>
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
                  setUpdateBody((prev) => ({ ...prev, description: e.target.value }));
                }}
              />
              <div>
                <button type="submit" onClick={(e) => {
                    e.preventDefault()
                    console.log(updateBody);

                }}>Salvar</button>
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
                  <tr key={index}>
                    <td>{ct.title}</td>
                    <td>{ct.description}</td>
                    <td>{ct.created_at}</td>
                    <td>
                      <button>Del</button>
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