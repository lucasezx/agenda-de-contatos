import { useState } from 'react'
import './App.css'

function App() {

  const [contatos, setContatos] = useState([])
  const [nome, setNome] = useState()
  const [telefone, setTelefone] = useState()
  const [endereco, setEndereco] = useState()
  const [editarContato, setEditarContato] = useState()

  const telefoneExiste = (telefone) => {
    return contatos.some(
      contato => contato.telefone === telefone
    );
  };


  return (
    <div className='title'>
      <h1>Agenda de Contatos</h1>

      <label>
        Nome:
        <input type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder='Nome' />
      </label>

      <p>
        <label>
          Telefone:
          <input type='text'
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            placeholder="Telefone" />
        </label>
      </p>

      <p>
        <label>
          Endereço:
          <input
            type="text"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            placeholder="Endereço" />
        </label>
      </p>

    { nome && telefone && (<button

        className='button'
        onClick={e => {
          if (nome === "" || telefone === "" || endereco === "") {
            alert("Preencha todos os campos!")
            return
          }

          if (nome.length < 4) {
            alert("O nome deve ter mais de 3 caracteres");
            return;
          }

          if (telefoneExiste(telefone)) {
            alert("O telefone já existe!");
            return;
          }

          const copyOfContatos = [...contatos]
          copyOfContatos.push({ nome, telefone, endereco });
          setContatos(copyOfContatos)
          setNome(""), setTelefone(""), setEndereco("")

        }}>
        Adicionar
      </button> )
      }
      {
        nome && telefone && (<button
          className="button"
          onClick={e => {
            if (nome === "" || telefone === "" || endereco === "") {
              alert("Preencha todos os campos!");
              return
            }
            if (nome.length < 4) {
              alert("O nome deve ter mais de 3 caracteres");
              return;
            }

            const copyOfContatos = [...contatos]
            if (editarContato !== "") {
              copyOfContatos[editarContato] = ({ nome, telefone, endereco });
              setEditarContato("");
            }

            if (telefoneExiste(telefone)) {
              alert("O telefone já existe!");
              return;
            }


            setContatos(copyOfContatos);
            setNome("");
            setTelefone("");
            setEndereco("");
          }}>
          Salvar
        </button>
        )
      }
     
      <button
        className='button'
        onClick={() => {
          setEditarContato('')
          setNome('')
          setTelefone('')
          setEndereco('')
        }}>
        Novo
      </button>

      <div className='agenda-contatos'>
        <table border={1}>
          <thead>
            <tr>
              <th>
                Nome
              </th>
              <th>
                Telefone
              </th>
              <th>
                Endereço
              </th>
              <th>
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {contatos.map((contato, indiceUmContato) => (
              <tr key={indiceUmContato}>
                <td>{contato.nome}</td>
                <td>{contato.telefone}</td>
                <td>{contato.endereco}</td>
                <td>
                  <button
                    onClick={() => {
                      setContatos(
                        contatos.filter((contato, indiceContatoSerFiltrado) => {
                          console.log(indiceContatoSerFiltrado)
                          console.log(indiceUmContato)
                          return indiceContatoSerFiltrado !== indiceUmContato;

                        }
                        )
                      );
                    }}>
                    Apagar
                  </button>

                  <button
                    onClick={() => {
                      setEditarContato(indiceUmContato)
                      setNome(contato.nome)
                      setTelefone(contato.telefone)
                      setEndereco(contato.endereco)

                    }}>
                    Editar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



export default App



