import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ConfirmDialog from "../components/ConfirmDialog";
import "../css/admin.css";

const AdminPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [confirmData, setConfirmData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  const fetchData = () => {
    api.get("/recipes").then((res) => setRecipes(res.data));
    api.get("/categories").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (type, id) => {
    setConfirmData({ type, id });
  };

  const handleConfirmDelete = () => {
    if (!confirmData) return;
    const { type, id } = confirmData;
    const endpoint = type === "recipe" ? `/recipes/${id}` : `/categories/${id}`;

    api.delete(endpoint)
      .then(() => {
        fetchData();
        setConfirmData(null);
      })
      .catch(() => alert("Erreur lors de la suppression"));
  };

  // Pagination pour les recettes
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="admin-page">
      <h1>Tableau de bord Administrateur</h1>

      <div className="admin-actions">
        <Link to="/add-recipe" className="admin-button">➕ Ajouter une recette</Link>
        <Link to="/add-category" className="admin-button">📂 Ajouter une catégorie</Link>
      </div>

      <div className="admin-section">
        <h2>Recettes existantes</h2>
        {recipes.length === 0 ? (
          <p>Aucune recette trouvée.</p>
        ) : (
          <>
            <ul className="admin-list">
              {currentRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <span>{recipe.title}</span>
                  <div className="action-links">
                    <Link to={`/edit-recipe/${recipe.id}`} className="edit-link">✏️</Link>
                    <button
                      onClick={() => confirmDelete("recipe", recipe.id)}
                      className="delete-button"
                    >🗑️</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>⬅️ Précédent</button>
              <span>Page {currentPage} / {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>Suivant ➡️</button>
            </div>
          </>
        )}
      </div>

      <div className="admin-section">
        <h2>Catégories existantes</h2>
        {categories.length === 0 ? (
          <p>Aucune catégorie trouvée.</p>
        ) : (
          <ul className="admin-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <span>{cat.name}</span>
                <div className="action-links">
                  <Link to={`/edit-category/${cat.id}`} className="edit-link">✏️</Link>
                  <button
                    onClick={() => confirmDelete("category", cat.id)}
                    className="delete-button"
                  >🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {confirmData && (
        <ConfirmDialog
          message={`Supprimer cette ${confirmData.type === "recipe" ? "recette" : "catégorie"} ?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmData(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;
