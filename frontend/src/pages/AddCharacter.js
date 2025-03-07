import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function AddCharacter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "hero",
    powers: "",
    image_url: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/characters", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => navigate("/characters"))
      .catch(() => setError("Error creating character."));
  };

  return (
    <Container className="add-character-container">
      <h2 className="my-4 text-center highlight-gold">Add a New Character</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required className="form-dark" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Alias</Form.Label>
          <Form.Control type="text" name="alias" onChange={handleChange} required className="form-dark" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Alignment</Form.Label>
          <Form.Select name="alignment" onChange={handleChange} className="form-dark">
            <option value="hero">Hero</option>
            <option value="villain">Villain</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Powers</Form.Label>
          <Form.Control as="textarea" name="powers" onChange={handleChange} required className="form-dark" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Image URL</Form.Label>
          <Form.Control type="text" name="image_url" onChange={handleChange} required className="form-dark" />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100 btn-custom">
          Add Character
        </Button>
      </Form>
    </Container>
  );
}

export default AddCharacter;
