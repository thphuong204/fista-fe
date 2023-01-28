import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Grid } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { FilterList } from "../features/transaction/FilterList";
import { WalletOptionBox } from "../features/transaction/TransactionsList";

function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("loading", loading)
  useEffect(()=> {
    setLoading(false)
  },[])

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack style={{ width: "100%"}}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <Grid container item xs={12} md={12} style={{ justifyContent: "center" }}>
                <FilterList WalletOptionBox={WalletOptionBox}/>
              </Grid>
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default ReportPage;