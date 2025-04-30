import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    api.get(`/categories/${id}`).then((res) => setName(res.data.name));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/categories/${id}`, { name }).then(() => navigate("/admin"));
  };

  return (
    <div className="form-container">
      <h1>Modifier une catégorie</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
