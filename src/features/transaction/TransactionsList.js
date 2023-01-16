import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { 
  Box,
  Grid, 
  List, 
  Typography, 
  Container, 
  InputBase,  
  Button, 
  Autocomplete,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {getTransactions} from './transactionSlice'
import { TRANSACTIONS_PER_PAGE } from "../../app/config";
import PaginationHandling from "../../components/PaginationHandling";

const BackgroundFirstLayer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderRadius: "10px"
}));

const BackgroundSecondLayer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.darker,
}));

function WalletOptionBox() {
  
  const walletLists = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
  ]

  return (
    <Autocomplete
      size="small"
      id="combo-box"
      options={walletLists}
      defaultValue={walletLists[0].title}
      sx={{ 
        width: "100%",
        '& .MuiFilledInput-root': {
          backgroundColor: "#fffaf0",
          boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)",
          color: "#4c4c4c"
        }, 
        '& .MuiFormLabel-root': {
          color: "#4c4c4c"
        },
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          variant="filled"
          label="Wallets" 
        />
      )}
    />
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.darker,
  boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)",
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.darker, 0.85),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '160px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    minHeight: '48px',
    padding: '0',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

function TransactionsByDate ({date, transactionsArray}) {
  return (
      <div 
        className="transactionByDate"
        style={{ 
        margin: "30px 0 0", 
        padding: "0 16px",
        borderLeft:"none", 
        borderRight:"none",
        backgroundColor: "#fffaf0"
        }}
      >
        <Box 
          style={{ 
            minHeight: "50px", 
            display: "flex", 
            alignItems: "center", 
            paddingLeft: "16px", 
            borderBottom: "1px solid #a0a0a0" 
          }}
        >
          <Typography>{date}</Typography>
        </Box>
        <Box>
          {transactionsArray.map((transObject, i) => {
            return (
              <Grid container spacing={2} style={{ width: "100%", margin:"0", padding: "2px 0"}}
                key={transObject._id}
              >
                  <Grid item xs={2}>
                    {`${transObject.category}`}
                  </Grid > 
                  <Grid item xs={6}>
                    {`${transObject.description}`}
                  </Grid>
                  <Grid item xs={4} style={{textAlign:"right"}}>
                    {`${transObject.amount}`}
                  </Grid>
              </Grid>
            );
          })}
        </Box>
      </div>
  )
}

function TransactionsList() {

  const [page, setPage] = useState(1);
  const [user] = useState("63bf72b6818c592241a1af58");
  let limit = TRANSACTIONS_PER_PAGE 
  const { 
    transactionById, currentPageTransactions, transactionByDate, isLoading, totalTransactions 
  } = useSelector(
    (state) => state.transaction
  );

  console.log("transactionByDate", transactionByDate)

  const dispatch = useDispatch();
    useEffect (() => {
      dispatch(getTransactions( user, page, limit ));
    }, [])

    let location = useLocation();
    let params = new URLSearchParams(location.search);

  return (
    <div 
      style={{ 
        width: "100%", 
        display: "flex", 
        flexWrap: "wrap",
        justifyContent: "center", 
        margin: "60px 0px",
      }}
    >
      <Box 
        sx={{ flexGrow: 1 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0 0 50px 0",
          padding: "0"
        }}
      > 
        <Grid container xs={12} md={6}>
          <Grid
            style={{
              maxWidth: "350px",
              display: "flex",
              margin: "0 0 16px 0",
              padding: "0"
            }}
          >
            <Button style={{
              backgroundColor: "#fffaf0"
              }}
            >
              Filter
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                margin: "0 0 16px 0",
                padding: "0"
              }}
            >
              <WalletOptionBox/>
            </Container>
            <Container
            sx={{
              '& div': {
                margin: "0"
              }
            }}
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                margin: "0 0 16px 0",
                padding: "0"
              }}
            >
              <Search style={{width: "100%"}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
              </Search>
            </Container>
            <Container
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                justifyContent: "left",
                margin: "0 0 16px 0",
                padding: "0"
              }}
            >
              <Button
                style={{ 
                  width: "100%",
                  height: "48px",
                  justifyContent: "left",
                  padding: "0 12px",
                  textTransform: "capitalize",
                  textAlign: "left",
                  fontSize: "16px",
                  backgroundColor: "#fffaf0",
                  color: "#4c4c4c",
                  boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
                }}
              >
                From Date: 01/01/2021
              </Button>
            </Container>
            <Container
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                margin: "0 0 16px 0",
                padding: "0"
              }}
            >
              <Button
                style={{ 
                  width: "100%",
                  height: "48px",
                  justifyContent: "left",
                  padding: "0 12px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  backgroundColor: "#fffaf0",
                  color: "#4c4c4c",
                  boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
                }}
              >
                To Date: 31/12/2021
              </Button>
            </Container>
          </Grid>
        </Grid>

        <Grid container xs={12} md={6}>
        
        </Grid>
      </Box>
      <Box 
        sx={{ flexGrow: 1 }}
        style={{
          border: "1px solid #f6f6f6",
          borderRadius: "10px",
          boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
        }}
      >
        <BackgroundFirstLayer>
          <Grid item xs={12} md={6}>
            <BackgroundSecondLayer 
              style={{ 
                borderTopRightRadius:"10px",
                borderTopLeftRadius:"10px" 
              }}
          >
              <Container
                style={{ 
                  minHeight: "50px", 
                  display: "flex", 
                  justifyContent:"space-around",
                  alignItems: "center", 
                  margin: "0", 
                  padding: "0 16px",
                  borderBottom: "2px solid #a0a0a0",
                }}
              >
                  <Typography 
                    style={{ 
                      fontWeight: "bold",
                      backgroundColor: "#ffde8a",
                      color: "#4c4c4c"
                    }}
                  >
                      THIS MONTH
                  </Typography>
              </Container>
              <Container 
                style={{ 
                  minHeight: "100px", 
                  display: "flex", 
                  alignItems: "center", 
                  margin: "0" 
                }}
              >
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
            </BackgroundSecondLayer>
            <List 
              style={{ padding: "0" }}
            >
              {transactionByDate.map((trans, index) => {
                return (
                  < TransactionsByDate 
                  key={index}
                  date={trans[0]} transactionsArray= {trans[1]}
                  />    
                )
              })}
            </List>
          </Grid>
        </BackgroundFirstLayer>
      </Box>
      < PaginationHandling page={page} totalPages={"100"} toRoute={"transs"} />
    </div>
  );
}

export default TransactionsList