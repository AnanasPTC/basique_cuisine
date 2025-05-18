import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setError("");

      navigate("/");
    } catch (err) {
      console.error("Erreur Axios :", err);
      if (err.response?.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">Se connecter</button>
      </form>
      
      <p>Pas encore de compte ?</p>
      <button onClick={goToRegister}>Créer un compte</button>
    </div>
  );
};

export default LoginPage;
