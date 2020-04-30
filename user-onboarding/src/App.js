import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import NewForm from "./components/Form";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import UserTable from "./components/UserTable";

function App() {
  const [post, setPost] = useState([]);

  const submitUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="App">
      <Row>
        <Col xs="12" md="4" b xl="5" style={{ marginRight: "5%" }}>
          <NewForm submitUser={submitUser}></NewForm>
        </Col>
        <Col>
          <h1>USERS</h1>
          <UserTable user={post} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;