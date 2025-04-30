import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, isAdmin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/recipes?search=${search}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fdfdfd",
        color: "#c49b00",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Ombre plus marquée
        zIndex: 1300, // assure qu’elle reste au-dessus des autres éléments
      }}
    >

      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Titre du site */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#c49b00",
            fontWeight: "bold",
            fontSize: "1.6rem",
          }}
        >
          BasiqueCuisine
        </Typography>

        {/* Barre de recherche */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFF3CD",
            borderRadius: 2,
            padding: "4px 12px",
            maxWidth: 500,
            width: "100%",
            flexGrow: 1,
            mx: 2,
          }}
        >
          <InputBase
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            inputProps={{ "aria-label": "rechercher" }}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton
            onClick={handleSearch}
            sx={{ color: "#c49b00" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Boutons de droite */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/recipes" sx={{ color: "#c49b00", fontWeight: "bold", fontSize: "1rem" }}>
            Recettes
          </Button>
          <Button component={Link} to="/meal-plans" sx={{ color: "#c49b00", fontWeight: "bold", fontSize: "1rem" }}>
            Programmes
          </Button>
          {!isLoggedIn ? (
            <Button component={Link} to="/login" sx={{ color: "#c49b00", fontWeight: "bold", fontSize: "1rem" }}>
              Connexion
            </Button>
          ) : isAdmin ? (
            <Button component={Link} to="/admin" sx={{ color: "#c49b00", fontWeight: "bold", fontSize: "1rem" }}>
              Administration
            </Button>
          ) : (
            <Button component={Link} to="/account" sx={{ color: "#c49b00", fontWeight: "bold", fontSize: "1rem" }}>
              Compte
            </Button>
          )}
        </Box>

        {/* Menu responsive */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{ color: "#c49b00" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem component={Link} to="/recipes" onClick={handleCloseMenu}>Recettes</MenuItem>
            <MenuItem component={Link} to="/meal-plans" onClick={handleCloseMenu}>Programmes</MenuItem>
            {!isLoggedIn ? (
              <MenuItem component={Link} to="/login" onClick={handleCloseMenu}>Connexion</MenuItem>
            ) : isAdmin ? (
              <MenuItem component={Link} to="/admin" onClick={handleCloseMenu}>Administration</MenuItem>
            ) : (
              <MenuItem component={Link} to="/account" onClick={handleCloseMenu}>Compte</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
