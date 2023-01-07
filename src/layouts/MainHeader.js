import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography, IconButton, Button } from "@mui/material";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const { user } = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <Logo />
          </IconButton>
          <Typography sx={{ mr: 1 }} variant="h6" color="inherit" component="div">
            Fista App:
          </Typography>
          <Typography sx={{ mr: 2 }} variant="h6" color="inherit" component="div">
            Welcome {user?.username}!
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              style={{ 
                margin:"0 10px",
                fontWeight: "bold",
                color: "#4c4c4c"
              }}
            >
              My Wallet
            </Button>
            <Button
              style={{ 
                margin:"0 10px",
                fontWeight: "bold",
                color: "#4c4c4c"
              }}
            >
              Categories
            </Button>
            <Button
              style={{ 
                margin:"0 10px",
                fontWeight: "bold",
                color: "#4c4c4c"
              }}
            >
              My Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;