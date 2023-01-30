import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Box,
  Grid, 
  List, 
  Typography, 
  Container, 
  Autocomplete,
  TextField
} from '@mui/material';
import {getTransactions} from './transactionSlice';
import {getWallets} from '../wallet/walletSlice';
import {getCategories} from '../category/categorySlice';
import { TRANSACTIONS_PER_PAGE } from "../../app/config";
import PaginationHandling from "../../components/PaginationHandling";
import { FilterList } from "./FilterList";
import { AddTransactionAccordion } from "./AddTransaction";
import { fNumber } from '../../utils/formatNumber';

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
          backgroundColor: "#fff",
          boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)",
          color: "#4c4c4c"
        }, 
        '& .MuiFormLabel-root': {
          color: "#4c4c4c"
        },
      }}
      style={{
        height: "32px"
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
                    {fNumber(transObject.amount)}
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
    transactionByDate, 
    isLoading, 
    totalPages
  } = useSelector(
    (state) => state.transaction
  );

  const { 
    walletById, 
    currentPageWallets
  } = useSelector(
    (state) => state.wallet
  );

  const { 
    categoryById, 
    currentPageCategories
  } = useSelector(
    (state) => state.category
  );

  console.log("transactionByDate", transactionByDate)
  const handllePageChange = (newpage) => {
    setPage(newpage)
  }

  const dispatch = useDispatch();
    
  useEffect (() => {
      dispatch(getTransactions( user, page, limit ));
  }, [page, limit])

  useEffect (() => {
    dispatch(getWallets( user, page, "all" ));
    dispatch(getCategories( user, page, "all" ));
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
        <Grid container item xs={12} md={12} style={{ justifyContent: "center" , alignContent: "center" }}>
          <AddTransactionAccordion 
            walletById={walletById}
            currentPageWallets={currentPageWallets}
            categoryById={categoryById}
            currentPageCategories={currentPageCategories}
          />
        </Grid>
        <Grid container item xs={12} md={12} style={{ justifyContent: "center" }}>
          <FilterList WalletOptionBox={WalletOptionBox}/>
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
                      <Typography>{fNumber(50000000)}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Typography>Outflow</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Typography>{fNumber(-10000000)}</Typography>
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
                    date={trans[0]} 
                    transactionsArray= {trans[1]}
                  />    
                )
              })}
            </List>
          </Grid>
        </BackgroundFirstLayer>
      </Box>
      < PaginationHandling 
        page={page} 
        totalPages={totalPages} 
        toRoute={"transs"} 
        handllePageChange={handllePageChange}
      />
    </div>
  );
}

export { TransactionsList, WalletOptionBox }