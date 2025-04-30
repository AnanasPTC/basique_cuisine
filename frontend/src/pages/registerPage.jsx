import React, { useState } from "react";
import api from "../api";

const RegisterPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", formData);
      console.log("Réponse d'inscription :", res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setError(""); // 👈 Ajout ici
      onRegister();
    } catch (err) {
      console.error("Erreur Axios :", err);
      if (err.response) {
        setError(err.response.data.message || "Erreur lors de l'inscription.");
      } else {
        setError("Erreur réseau ou serveur.");
      }
    }
    
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" name="username" placeholder="Pseudo" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
      <input type="password" name="password_confirmation" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterPage;
