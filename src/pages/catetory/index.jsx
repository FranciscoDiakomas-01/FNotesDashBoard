import './index.css'
import { useState , useEffect } from 'react';
import { createCategory, getAllCategory } from "../../services/category";
import { deleteCategory , updateCategory } from '../../services/category';
import { toast } from 'react-toastify';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
export default function Category() {
  const [category, setCategory] = useState([])
  const [add, setAdd] = useState(false)
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
    total : 0
  });
  const [page, setpage] = useState(1);
  const [updateBody, setUpdateBody] = useState({
    title: "",
    description: "",
    id : 0
  })
  const [edit, setEdit] = useState(false);
    useEffect(() => {
      async function getAll() {
        const response = await getAllCategory(page)
        setCategory(response?.data)
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.currentPage,
          lastPage: response?.lastPage,
          total : response?.total
        }));
      }
      getAll()
    }, [page , reload]);
    return (
      <section
        id="category"
        onClick={(e) => {
          if (e.target.id == "form" && add) {
            setAdd(false);
          }
        }}
      >
        <form>
          <button
            type="button"
            onClick={() => {
              if (page == 1) {
                setpage(pagination.lastPage);
                return;
              } else {
                setpage(prev => prev - 1);
                return;
              }
            }}
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (pagination.lastPage > page) {
                setpage((prev) => prev + 1);
                return;
              } else {
                setpage(1);
                return;
              }
            }}
          >
            {">"}
          </button>
        </form>
        {add && (
          <aside id="form">
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
                    const response = await createCategory(updateBody);
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
          <aside id="form">
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
        <article>
          {category.length > 0 &&
            category.map((ct, index) => (
              <figure key={ct.id}>
                <figcaption>
                  <span>
                    {ct.title[0]?.toUpperCase() + ct.title.slice(1, 3)}
                  </span>
                  <p>{ct.title}</p>
                  <p>{ct.created_at}</p>
                  <div>
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
                      <FaRegTrashAlt />
                    </button>
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
                      <FaRegEdit />
                    </button>
                  </div>
                </figcaption>
                <p>{ct.description}</p>
              </figure>
            ))}
        </article>
        <button
          onClick={() => {
            setAdd((prev) => !prev);
          }}
        >
          {add ? "-" : "+"}
        </button>
        <span>{pagination?.currentPage + " de " + pagination?.lastPage}</span>
      </section>
    );
}