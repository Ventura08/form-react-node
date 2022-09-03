import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  const [result, setResult] =
    useState<
      [{name: string; email: string; id: number }]
    >();

  let emailInput: any;
  let nameInput: any;

  const api = async () => {
    const data = await fetch("http://localhost:3001/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const jsonData = await data.json();
    setResult(jsonData.data);
  };

  useEffect(() => {
    api();
  }, []);

  async function createUsers() {
    await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
      }),
    });
  }

  function handleChangeName(event: any) {
    nameInput = event.target.value;
  }

  function handleChangeEmail(event: any) {
    emailInput = event.target.value;
  }


  return (
    <div className="row" style={{ margin: "0 auto", padding: "30px 60px" }}>
      <div className="col-md-6">
        <div style={{ padding: "10px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Listagem de Usuários</h3>
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
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="col-md-6">
        <Form>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Cadastro de Usuários</h3>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" onChange={handleChangeName} />
            <Form.Text className="text-muted">
             
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={handleChangeEmail}/>
          </Form.Group>
          <Button variant="success" onClick={() => createUsers()}>
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
