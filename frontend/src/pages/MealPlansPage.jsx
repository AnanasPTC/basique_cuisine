import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const joursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const MealPlansPage = () => {
  const [budget, setBudget] = useState("");
  const [targetCalories, setTargetCalories] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = () => {
    // Simulation de recettes (remplacer avec un appel API réel plus tard)
    const fakeRecipes = [
      { id: 1, title: "Salade de quinoa", cost_level: "€", calories: 500 },
      { id: 2, title: "Poulet rôti", cost_level: "€€", calories: 700 },
      { id: 3, title: "Tacos végétariens", cost_level: "€", calories: 650 },
    ];

    const plan = joursSemaine.map((day) => ({
      day,
      recipes: [fakeRecipes[Math.floor(Math.random() * fakeRecipes.length)]],
    }));

    setGeneratedPlan(plan);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom mt={4}>
        Générateur de programme alimentaire
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        mt={4}
      >
        <FormControl sx={{ width: "250px" }}>
          <InputLabel id="budget-label">Budget</InputLabel>
          <Select
            labelId="budget-label"
            value={budget}
            label="Budget"
            onChange={(e) => setBudget(e.target.value)}
          >
            <MenuItem value="€">€ (Petit budget)</MenuItem>
            <MenuItem value="€€">€€ (Moyen budget)</MenuItem>
            <MenuItem value="€€€">€€€ (Gros budget)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Calories cibles"
          type="number"
          value={targetCalories}
          onChange={(e) => setTargetCalories(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={!budget || !targetCalories}
        >
          Générer le plan
        </Button>
      </Box>

      {generatedPlan && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Programme généré
          </Typography>

          {generatedPlan.map((dayPlan, index) => (
            <Box
              key={index}
              mt={2}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
            >
              <Typography variant="h6">{dayPlan.day}</Typography>
              {dayPlan.recipes.map((recipe) => (
                <Box key={recipe.id} ml={2}>
                  <Typography>{recipe.title}</Typography>
                  <Typography variant="body2">
                    Coût : {recipe.cost_level}
                  </Typography>
                  <Typography variant="body2">
                    Calories : {recipe.calories}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MealPlansPage;
