import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/addRecipe.css";

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => setFormData(res.data));
    api.get("/categories").then((res) => setCategories(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/recipes/${id}`, formData)
      .then(() => navigate("/admin"))
      .catch((err) => console.error(err));
  };

  if (!formData) return <p>Chargement...</p>;

  return (
    <div className="form-container">
      <h1>Modifier une recette</h1>
      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Description :</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Temps de préparation :</label>
        <input type="number" name="preparation_time" value={formData.preparation_time} onChange={handleChange} />

        <label>Calories :</label>
        <input type="number" name="calories" value={formData.calories} onChange={handleChange} />

        <label>Coût :</label>
        <select name="cost_level" value={formData.cost_level} onChange={handleChange}>
          <option value="€">€</option>
          <option value="€€">€€</option>
          <option value="€€€">€€€</option>
        </select>

        <label>Catégorie :</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
