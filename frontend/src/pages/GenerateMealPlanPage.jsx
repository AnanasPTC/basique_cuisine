import React, { useState } from "react";
import {
  Container,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import api from "../api";

const GenerateMealPlanPage = () => {
  const [calories, setCalories] = useState("");
  const [budget, setBudget] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const res = await api.post("/meal-plans/generate", {
        target_calories: calories,
        budget,
      });

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Erreur lors de la génération du plan"
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Générer un programme alimentaire
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Calories cibles"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <InputLabel id="budget-label">Budget</InputLabel>
        <Select
          fullWidth
          labelId="budget-label"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="€">Peu (€)</MenuItem>
          <MenuItem value="€€">Moyen (€€)</MenuItem>
          <MenuItem value="€€€">Beaucoup (€€€)</MenuItem>
        </Select>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Générer
        </Button>
      </Box>

      {response && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Plan généré :</Typography>
          <ul>
            {response.data.days.map((day, index) => (
              <li key={day.id}>
                <strong>Jour {index + 1}</strong> :
                {day.recipes.map((r) => ` ${r.title}`).join(", ")}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  );
};

export default GenerateMealPlanPage;
