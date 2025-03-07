import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Modal } from "react-bootstrap";
import "../styles.css";

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/characters/${id}`)
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setError("Failed to fetch character details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/characters/${id}`)
      .then(() => {
        setShowDeleteModal(false);
        alert("Character deleted successfully!");
        navigate("/characters");
      })
      .catch((err) => {
        console.error("Error deleting character:", err);
        alert("Failed to delete character.");
      });
  };

  if (loading) return <p>Loading character details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!character) return <p className="text-warning">Character not found.</p>;

  return (
    <Container className="character-detail-container">
      <Card className="character-detail">
        <Card.Img
          variant="top"
          src={character.image_url}
          alt={character.name}
          className="character-image-large"
        />
        <Card.Body>
          <Card.Title className="highlight-gold">{character.name}</Card.Title>
          <Card.Subtitle className="highlight-blue">{character.alias}</Card.Subtitle>
          <p>
            <strong>Alignment:</strong>{" "}
            <span className={character.alignment === "hero" ? "hero-text" : "villain-text"}>
              {character.alignment}
            </span>
          </p>
          <p>
            <strong>Powers:</strong> {character.powers}
          </p>
        </Card.Body>
        <div className="button-group">
          <Link to={`/characters/${id}/edit`}>
            <Button variant="warning" className="w-100 mb-2">Edit Character</Button>
          </Link>
          <Button
            variant="danger"
            className="w-100 mb-2"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Character
          </Button>
          <Link to="/characters">
            <Button variant="primary" className="w-100">Back to Characters</Button>
          </Link>
        </div>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{character.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CharacterDetail;
