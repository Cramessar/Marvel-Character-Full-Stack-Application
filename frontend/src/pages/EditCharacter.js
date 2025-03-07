import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "../styles.css";

function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "hero",
    powers: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log(`Fetching character details for ID: ${id}`);
    axios
      .get(`http://127.0.0.1:5000/characters/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setError("Character not found. It may have been deleted.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Updating character at: http://127.0.0.1:5000/characters/${id}`);

    axios
      .put(`http://127.0.0.1:5000/characters/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setSuccessMessage("Character updated successfully!");
        setTimeout(() => navigate("/characters"), 2000);
      })
      .catch((err) => {
        console.error("Error updating character:", err);
        setError("Failed to update character. Please try again.");
      });
  };

  if (loading) return <p>Loading character details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="add-character-container">
      <h2 className="my-4 text-center">Edit Character</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-dark"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="form-dark"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Alignment</Form.Label>
          <Form.Select
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
            className="form-dark"
          >
            <option value="hero">Hero</option>
            <option value="villain">Villain</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Powers</Form.Label>
          <Form.Control
            as="textarea"
            name="powers"
            value={formData.powers}
            onChange={handleChange}
            className="form-dark"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="form-dark"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-custom w-100">
          Update Character
        </Button>
      </Form>
    </Container>
  );
}

export default EditCharacter;
