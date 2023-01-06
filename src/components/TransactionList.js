import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, List, Typography, Container } from '@mui/material';

const data = [1,2,3];

const BackgroundList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TransactionsByDate = () => {
  return (
    <div style={{ margin: "0 0 10px", border:" 1px solid black", borderLeft:"none", borderRight:"none"}}>
      <Box style={{ minHeight: "50px", display: "flex", alignItems: "center", paddingLeft: "16px", borderBottom: "1px solid" }}>
        <Typography>Date</Typography>
      </Box>
      <Box>
        {["date 1", "date 2", "date non 3", "date ytest thu cai 4"].map((value, i) => {
          return (
            <Grid container spacing={2} style={{ width: "100%", margin:"0", padding: "2px 16px"}}
              key={value}
            >
                <Grid item xs={2}>
                  {`Category ${value}`}
                </Grid > 
                <Grid item xs={6}>
                  {`Description ${value}`}
                </Grid>
                <Grid item xs={4} style={{textAlign:"right"}}>
                  {`Amount ${value}`}
                </Grid>
            </Grid>
          );
        })}
      </Box>
    </div>
  )
}

function TransactionsList({transactionObject}) {
    return (
      <div 
        style={{ 
          width: "100%", 
          display: "flex", 
          flexWrap: "wrap",
          justifyContent: "center", 
          margin: "40px 10px"
        }}
      >
        <Container>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Transactions
          </Typography>
        </Container>
        <Box sx={{ flexGrow: 1 }} style={{ border: "1px solid black"}}>
          <Grid item xs={12} md={6}>
            <Container style={{ minHeight: "100px", display: "flex", alignItems: "center", margin: "0" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Typography>Inflow</Typography>
                  </Grid>
                  <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>Amount1</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography>Outflow</Typography>
                  </Grid>
                  <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>Amount2</Typography>
                  </Grid>
                </Grid>
            </Container>
            <BackgroundList>
              <List>
                <TransactionsByDate />
              </List>
            </BackgroundList>
          </Grid>
        </Box>
      </div>
    );
}

export default TransactionsList