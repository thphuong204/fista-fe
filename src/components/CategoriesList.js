import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Grid, 
  List, 
  Typography, 
  ListItem, 
  Avatar, 
  ListItemAvatar, 
  ListItemText 
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const data = [1,2,3];

const BackgroundList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function CategoriesList({walletObject}) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Categories with name and icon
          </Typography>
          <BackgroundList>
            <List>
              {data.map((item) => {
                return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item}
                  />
                </ListItem>
              )})}
            </List>
          </BackgroundList>
        </Grid>
        </Box>
      </div>
    );
}

export default CategoriesList