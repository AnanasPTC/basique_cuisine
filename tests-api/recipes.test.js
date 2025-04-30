const axios = require("axios");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

let createdRecipeId = null;

describe("Tests Recettes", () => {
  test("Créer une recette valide", async () => {
    const res = await api.post("/recipes", {
      title: "Salade de fruits",
      description: "Recette test via Jest",
      cost_level: "€",
      preparation_time: 10,
      calories: 200,
      category_id: 1, // Assure-toi que cette catégorie existe
    });

    createdRecipeId = res.data.id;
    expect(res.status).toBe(201);
    expect(res.data.title).toBe("Salade de fruits");
  });

  test("Modifier une recette", async () => {
    const res = await api.put(`/recipes/${createdRecipeId}`, {
      title: "Salade modifiée",
      description: "Version modifiée",
      cost_level: "€€",
      preparation_time: 15,
      calories: 250,
      category_id: 1,
    });

    expect(res.status).toBe(200);
    expect(res.data.title).toBe("Salade modifiée");
  });

  test("Supprimer une recette", async () => {
    const res = await api.delete(`/recipes/${createdRecipeId}`);
    expect(res.status).toBe(204);
  });
});
