import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  const [deleteModal, setShowModalDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [request, setRequest] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [result, setResult] =
    useState<
      [{ id: number; planet_reference: string; name: string; radio: number }]
    >();

  let idInput: any;
  let nameInput: any;
  let planetInput: any;
  let radioInput: any;

  const api = async () => {
    const data = await fetch("http://localhost:3001/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const jsonData = await data.json();
    console.log(jsonData);
    // setResult(jsonData.data.data);
  };

  useEffect(() => {
    api();
  }, [showModalAdd, deleteModal, showModal]);

  async function createUsers() {
    await fetch("localhost:3001/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        email: planetInput,
      }),
    });
  }

  function handleChangeId(event: any) {
    idInput = event.target.value;
  }

  function handleChangeName(event: any) {
    nameInput = event.target.value;
  }

  function handleChangePlanet(event: any) {
    planetInput = event.target.value;
  }

  function handleChangeRadio(event: any) {
    radioInput = event.target.value;
  }

  return (
    <div className="row" style={{ margin: "0 auto", padding: "30px 60px" }}>
      <div className="col-md-6">
        <div style={{ padding: "10px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Listagem de Usuários</h3>
            <Button variant="primary">Novo usuário</Button>{" "}
          </div>
          <div>
            <p>Cadastre e visualize todos os usuários.</p>
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.planet_reference}</td>
                  <td>{item.radio}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="col-md-6">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Button variant="success" type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
