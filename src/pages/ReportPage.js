import React, { useState, useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";

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
              <Stack>
              </Stack>
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default ReportPage;