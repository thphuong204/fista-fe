import React from "react";
import { Container } from "@mui/material";
import WalletsList from '../features/wallet/WalletsList';
import { Outlet } from "react-router-dom";

function WalletPage() {

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <WalletsList>
        <Outlet/>
      </WalletsList>
    </Container>
  );
}

export default WalletPage;