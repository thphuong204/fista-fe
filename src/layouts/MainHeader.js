import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography, IconButton, Button, MenuItem, Menu  } from "@mui/material";
import { Divider } from "@mui/material";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function NavButton( { textInput }) {
  return (
    <Button
      style={{ 
        margin:"0 10px",
        fontWeight: "bold",
        color: "#4c4c4c"
      }} 
    >
      {textInput}
    </Button>
  );
}


function MainHeader() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

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
            <Link to='/wallets'>
              <NavButton textInput={"My Wallet"}/>
            </Link>
            <Link to='/categories'>
              <NavButton textInput={"Categories"}/>
            </Link>
            <a href='/'>
              <NavButton textInput={"Transaction"}/>
            </a>
            <Link onClick={handleProfileMenuOpen} to='/users'>
              <NavButton  textInput={"My Account"}/>
            </Link>
            {renderMenu}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;