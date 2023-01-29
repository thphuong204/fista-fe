import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Grid, 
  List, 
  Typography, 
  ListItem, 
  IconButton, 
  Avatar, 
  ListItemButton,
  ListItemAvatar, 
  ListItemText 
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const BackgroundList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


function WalletsList({currentPageWallets, walletById , page, limit}) {

    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ fontWeight: "600" }}>
            Wallets
          </Typography>
          <BackgroundList>
            <List>
              {currentPageWallets.map((item, index) => {
                return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={walletById[item].name}
                  />
                  </ListItemButton>
                </ListItem>
              )})}
            </List>
          </BackgroundList>
        </Grid>
        </Box>
      </div>
    );
}

export default WalletsList