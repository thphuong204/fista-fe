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
  const [user] = useState("63bf72b6818c592241a1af58");
  let limit = CATEGORIES_PER_PAGE ;

  const { 
    categoryById, currentPageCategories, isLoading, totalCategories
  } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();
    useEffect (() => {
      dispatch(getCategories( user, page, limit ));
  }, [])

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <CategoriesList 
        categoryById={categoryById} 
        currentPageCategories={currentPageCategories}
        totalCategories={totalCategories}
      >
        <Outlet/>
      </CategoriesList>
      <PaginationHandling page={"1"} totalPages={"10"} toRoute={"categories"} />
    </Container>
  );
}

export default CategoryPage;