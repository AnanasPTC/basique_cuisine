import React, { useState } from "react";
import api from "../api";
import "../css/addCategory.css";

const AddCategoryPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/categories", { name });
      setMessage("Catégorie ajoutée avec succès !");
      setName("");
    } catch (error) {
      if (error.response?.data?.errors) {
        setMessage("Erreur : " + JSON.stringify(error.response.data.errors));
      } else {
        setMessage("Erreur lors de l'ajout.");
      }
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Ajouter une catégorie</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nom de la catégorie :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddCategoryPage;
