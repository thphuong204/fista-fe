import React from "react";
import { Container } from "@mui/material";
import ListOfWallets from '../components/ListOfWallets';
import { Outlet } from "react-router-dom";

function WalletPage() {

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <ListOfWallets>
        <Outlet/>
      </ListOfWallets>
    </Container>
  );
}

export default WalletPage;