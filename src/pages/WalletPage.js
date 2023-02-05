import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { WALLETS_PER_PAGE } from "../app/config";
import {getWallets} from '../features/wallet/walletSlice'
import WalletsList from '../features/wallet/WalletsList';
import PaginationHandling from "../components/PaginationHandling";

function WalletPage() {
  const [page, setPage] = useState(1);
  let limit = WALLETS_PER_PAGE 

  const { 
    walletById, currentPageWallets, isLoading, totalWallets, totalPages
  } = useSelector(
    (state) => state.wallet
  );

  const handllePageChange = (newpage) => {
    setPage(newpage)
  }

  const dispatch = useDispatch();
    useEffect (() => {
      dispatch(getWallets( page, limit ));
  }, [page, limit, dispatch])

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
      <WalletsList 
        currentPageWallets={currentPageWallets} 
        walletById={walletById} 
        page={page} 
        limit={limit}
      >
        <Outlet/>
      </WalletsList>
      <PaginationHandling 
        page={1} 
        totalPages={totalPages} 
        toRoute={"wallets"}  
        handllePageChange={handllePageChange}
      />
    </Container>
  );
}

export default WalletPage;