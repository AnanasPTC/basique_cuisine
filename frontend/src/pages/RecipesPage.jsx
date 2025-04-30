import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ cost: "", calories: "" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/recipes").then((res) => setRecipes(res.data));
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const costMatch =
      filters.cost === "" || recipe.cost_level === filters.cost;

    const caloriesMatch =
      filters.calories === "" ||
      (filters.calories === "low" && recipe.calories < 300) ||
      (filters.calories === "medium" &&
        recipe.calories >= 300 &&
        recipe.calories <= 600) ||
      (filters.calories === "high" && recipe.calories > 600);

    return costMatch && caloriesMatch;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Recettes
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="cost-filter-label">Filtrer par coût</InputLabel>
            <Select
              labelId="cost-filter-label"
              value={filters.cost}
              label="Filtrer par coût"
              onChange={(e) =>
                setFilters({ ...filters, cost: e.target.value })
              }
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="€">€ (Pas cher)</MenuItem>
              <MenuItem value="€€">€€ (Moyen)</MenuItem>
              <MenuItem value="€€€">€€€ (Cher)</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="calorie-filter-label">Filtrer par calories</InputLabel>
            <Select
              labelId="calorie-filter-label"
              value={filters.calories}
              label="Filtrer par calories"
              onChange={(e) =>
                setFilters({ ...filters, calories: e.target.value })
              }
            >
              <MenuItem value="">Toutes</MenuItem>
              <MenuItem value="low">Moins de 300 kcal</MenuItem>
              <MenuItem value="medium">300 - 600 kcal</MenuItem>
              <MenuItem value="high">Plus de 600 kcal</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container columns={12} spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <Card
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "0.3s",
                ":hover": {
                  boxShadow: 6,
                  transform: "scale(1.03)",
                },
              }}
            >
              {recipe.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`http://localhost:8000/storage/${recipe.image}`}
                  alt={recipe.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Coût : {recipe.cost_level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Temps de préparation : {recipe.preparation_time} min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calories : {recipe.calories} kcal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipesPage;
