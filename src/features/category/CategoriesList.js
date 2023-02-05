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
  Typography
} from '@mui/material';

const BackgroundList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function CategoriesList({categoryById, currentPageCategories, totalCategories}) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ fontWeight: "600" }}>
            Categories
          </Typography>
          <BackgroundList>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                  <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageCategories.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell scope="row" style={{textTransform: "capitalize"}}>
                        {categoryById[item]?.name}
                      </TableCell>
                      <TableCell style={{textTransform: "capitalize"}}>
                        {categoryById[item]?.classification}
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

export default CategoriesList