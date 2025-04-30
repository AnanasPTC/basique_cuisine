import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => setRecipe(res.data));
  }, [id]);

  if (!recipe) return <p>Chargement...</p>;

  return (
    <div className="recipe-detail" style={{ padding: "40px" }}>
      <h1>{recipe.title}</h1>
      <img
        src={`http://localhost:8000/storage/${recipe.image}`}
        alt={recipe.title}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
      />
      <p><strong>Temps de préparation :</strong> {recipe.preparation_time} min</p>
      <p><strong>Calories :</strong> {recipe.calories} kcal</p>
      <p><strong>Coût :</strong> {recipe.cost_level}</p>
      <p><strong>Description :</strong> {recipe.description}</p>
    </div>
  );
};

export default RecipeDetailPage;
