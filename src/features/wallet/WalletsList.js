import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Grid, 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography, 
  IconButton, 
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                  <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
                  <TableCell style={{fontWeight:"bold"}}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {currentPageWallets.map((item, index) => {
                return (
                  <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton edge="end" aria-label="delete">
                        <FolderIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {walletById[item]?.name}
                    </TableCell>
                    <TableCell>
                      {walletById[item]?.classification}
                    </TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              )})}
              </TableBody>
            </Table>
          </BackgroundList>
        </Grid>
        </Box>
      </div>
    );
}

export default WalletsList