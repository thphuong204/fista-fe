import React from "react";
import { Container } from "@mui/material";
import CategoriesList from '../components/CategoriesList';
import { Outlet } from "react-router-dom";

function CategoryPage() {

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <CategoriesList>
        <Outlet/>
      </CategoriesList>
    </Container>
  );
}

export default CategoryPage;