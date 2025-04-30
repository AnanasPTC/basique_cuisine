const axios = require("axios");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

describe("Tests Auth", () => {
  test("Inscription utilisateur", async () => {
    const response = await api.post("/register", {
      username: "Test User",
      email: `test${Date.now()}@test.com`,
      password: "password",
      password_confirmation: "password",
    });

    expect(response.data).toHaveProperty("token");
    expect(response.data).toHaveProperty("user");
  });

  test("Connexion utilisateur", async () => {
    const response = await api.post("/login", {
      email: "lucas.huchede@gmail.com", // remplace par un vrai utilisateur
      password: "LULUlulu04",   // et le bon mot de passe
    });

    expect(response.data).toHaveProperty("token");
  });
});
