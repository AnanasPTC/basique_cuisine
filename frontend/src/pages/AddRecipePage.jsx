import React, { useEffect, useState } from "react";
import api from "../api";
import "../css/addRecipe.css";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cost_level: "€",
    preparation_time: "",
    calories: "",
    category_id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur chargement catégories", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    try {
      await api.post("/recipes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Recette ajoutée avec succès !");
      setFormData({
        title: "",
        description: "",
        cost_level: "€",
        preparation_time: "",
        calories: "",
        category_id: "",
      });
      setImageFile(null);
    } catch (error) {
      if (error.response?.data?.errors) {
        setMessage("Erreur : " + JSON.stringify(error.response.data.errors));
      } else {
        setMessage("Erreur lors de l'ajout de la recette.");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Ajouter une recette</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description :</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Temps de préparation (min) :</label>
        <input type="number" name="preparation_time" value={formData.preparation_time} onChange={handleChange} required />

        <label>Calories :</label>
        <input type="number" name="calories" value={formData.calories} onChange={handleChange} required />

        <label>Coût :</label>
        <select name="cost_level" value={formData.cost_level} onChange={handleChange}>
          <option value="€">€ (Pas cher)</option>
          <option value="€€">€€ (Moyen)</option>
          <option value="€€€">€€€ (Cher)</option>
        </select>

        <label>Catégorie :</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label>Image :</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
