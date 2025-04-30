import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff1a8", // Jaune doux et clair (plus fidèle à Marmiton)
        color: "#000",              // Texte noir pour la lisibilité
        py: 3,
        mt: "auto",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Ombre douce
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body1" fontWeight="bold">
          © {new Date().getFullYear()} Basique Cuisine. Tous droits réservés.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="/mentions-legales" color="inherit" underline="hover">
            Mentions légales
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
