import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import WalletsList from '../features/wallet/WalletsList';
import { Outlet } from "react-router-dom";
import { WALLETS_PER_PAGE } from "../app/config";
import {getWallets} from '../features/wallet/walletSlice'

function WalletPage() {
  const [page, setPage] = useState(1);
  const [user] = useState("63bf72b6818c592241a1af58");
  let limit = WALLETS_PER_PAGE 
  const { 
    walletById, currentPageWallets, isLoading, totalWallets
  } = useSelector(
    (state) => state.wallet
  );

  const dispatch = useDispatch();
    useEffect (() => {
      dispatch(getWallets( user, page, limit ));
  }, [])

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <WalletsList 
        currentPageWallets={currentPageWallets} 
        walletById={walletById} 
        page={page} 
        limit={limit}
      >
        <Outlet/>
      </WalletsList>
    </Container>
  );
}

export default WalletPage;