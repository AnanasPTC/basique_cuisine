import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import MealPlansPage from "./pages/MealPlansPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LegalMentionsPage from "./pages/LegalMentionsPage";
import AddRecipePage from "./pages/AddRecipePage";
import AddCategoryPage from "./pages/AddCategoryPage";
import AdminPage from "./pages/AdminPage";
import EditRecipePage from "./pages/EditRecipePage";
import EditCategoryPage from "./pages/EditCategoryPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { Box } from "@mui/material";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Router>
        <Navbar />
        <Box component="main" flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/meal-plans" element={<MealPlansPage />} />
            <Route path="/mentions-legales" element={<LegalMentionsPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/add-category" element={<AddCategoryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
            <Route path="/edit-category/:id" element={<EditCategoryPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
};

export default App;
