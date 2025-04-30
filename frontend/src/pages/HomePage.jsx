import { Button, Typography, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fefae0"
      padding={3}
      textAlign="center"
    >
      <Typography variant="h2" gutterBottom color="primary">
        Bienvenue sur Basique Cuisine
      </Typography>

      <Typography variant="h5" mb={5}>
        Créez et gérez vos recettes, et générez un programme alimentaire équilibré !
      </Typography>

      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center">
        <Button
          component={Link}
          to="/meal-plans"
          variant="contained"
          size="large"
          color="success"
        >
          Générer un programme alimentaire
        </Button>

        <Button
          component={Link}
          to="/recipes"
          variant="outlined"
          size="large"
          color="primary"
        >
          Voir les recettes
        </Button>

        {!token && (
          <>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              color="secondary"
            >
              Se connecter
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              color="secondary"
            >
              S’inscrire
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
