import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import CategoriesList from "../features/category/CategoriesList";
import PaginationHandling from "../components/PaginationHandling";
import { Outlet } from "react-router-dom";
import { CATEGORIES_PER_PAGE } from "../app/config";
import {getCategories} from "../features/category/categorySlice";

function CategoryPage() {
  const [page, setPage] = useState(1);
  let limit = CATEGORIES_PER_PAGE ;
  
  const { 
    categoryById, currentPageCategories, isLoading, totalCategories, totalPages
  } = useSelector(
    (state) => state.category
  );

  const handllePageChange = (newpage) => {
    setPage(newpage)
  };

  const dispatch = useDispatch();
    useEffect (() => {
      dispatch(getCategories( page, limit ));
  }, [page, limit, dispatch]);

  return (
    <Container 
      sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        minHeight: "100vh", 
        mt: 3, 
        mb: "50px" 
      }}
    >
      <CategoriesList 
        categoryById={categoryById} 
        currentPageCategories={currentPageCategories}
        totalCategories={totalCategories}
      >
        <Outlet/>
      </CategoriesList>
      <PaginationHandling 
        page={page} 
        totalPages={totalPages} 
        toRoute={"categories"}  
        handllePageChange={handllePageChange}
      />
    </Container>
  );
}

export default CategoryPage;