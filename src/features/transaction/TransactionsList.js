import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { TRANSACTIONS_PER_PAGE } from "../../app/config";
import PaginationHandling from "../../components/PaginationHandling";
import { fNumber } from '../../utils/formatNumber';
import { getCategories } from '../category/categorySlice';
import { getWallets } from '../wallet/walletSlice';
import { AddTransactionAccordion } from "./AddTransaction";
import { FilterList } from "./FilterList";
import { TransactionModal } from "./TransactionModal";
import { getTransactions } from './transactionSlice';

const BackgroundFirstLayer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderRadius: "10px"
}));

const BackgroundSecondLayer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.darker,
}));

function TransactionsByDate({ date, transactionsArray, handleOpenModal, handleCloseModal, setChosedId }) {

  return (
    <div
      className="transactionByDate"
      style={{
        margin: "30px 0 0",
        padding: "0 16px",
        fontSize: "14px",
        borderLeft: "none",
        borderRight: "none",
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
        <Typography style={{ fontSize: "14px" }}>{date}</Typography>
      </Box>
      <Box>
        {transactionsArray?.map((transObject, i) => {
          return (
            <Grid container spacing={2} style={{ width: "100%", margin: "0", padding: "2px 0" }}
              key={transObject._id}
            >
              <Grid item xs={3} style={{ padding: 0, wordBreak: "break-all" }}>
                {`${transObject?.category?.name}`}
              </Grid >
              <Grid item xs={4} style={{ padding: 0, wordBreak: "break-word" }}>
                {`${transObject?.description}`}
              </Grid>
              <Grid item xs={3} style={{ padding: 0, textAlign: "right", wordBreak: "break-word" }}>
                {fNumber(transObject.amount)}
              </Grid>
              <Grid item xs={2} style={{ padding: 0, display: "flex", paddingLeft: "4px", justifyContent: "right" }}>
                <IconButton edge="end" aria-label="change" style={{ padding: "2px", maxHeight: "14px", fontSize: "14px" }}
                  onClick={() => {
                    handleOpenModal();
                  }}>
                  <EditIcon style={{ padding: 0, maxHeight: "14px" }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" style={{ padding: "2px", maxHeight: "14px", fontSize: "14px" }}
                // onClick={() => 
                //   handleDeleteWallet(item)
                // }
                >
                  <DeleteIcon style={{ padding: 0, maxHeight: "14px" }} />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </div>
  )
}

function TransactionsList() {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [type, setType] = useState();
  let limit = TRANSACTIONS_PER_PAGE

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const fromDateParam = searchParams.get('fromDate');
    const toDateParam = searchParams.get('toDate');
    const descriptionParam = searchParams.get('description');

    dispatch(getTransactions({
      fromDate: fromDateParam || new Date(),
      toDate: toDateParam || new Date(),
      description: descriptionParam || '',
      page: pageParam || 1,
      limit
    }))

  }, [dispatch, limit, searchParams])


  const [openUpdate, setOpenUpdate] = React.useState(false);


  const {
    transactionByDate,
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

  let walletArray = []
  currentPageWallets.forEach((id) => {
    walletArray.push(
      walletById[id]
    )
  })

  let incomeCategoryArray = []
  let expenseCategoryArray = []
  let inflowCategoryArray = []
  let outflowCategoryArray = []
  currentPageCategories.forEach((id) => {
    if (categoryById[id]?.classification === "income") {
      incomeCategoryArray.push(
        categoryById[id]
      )
    }

    if (categoryById[id]?.classification === "expense") {
      expenseCategoryArray.push(
        categoryById[id]
      )
    }

    if (
      categoryById[id]?.classification === "inflow" ||
      categoryById[id]?.classification === "increasing asset" ||
      categoryById[id]?.classification === "increasing receivable" ||
      categoryById[id]?.classification === "reducing payable"
    ) {
      inflowCategoryArray.push(
        categoryById[id]
      )
    }

    if (
      categoryById[id]?.classification === "outflow" ||
      categoryById[id]?.classification === "reducing asset" ||
      categoryById[id]?.classification === "reducing receivable" ||
      categoryById[id]?.classification === "increasing payable"
    ) {
      outflowCategoryArray.push(
        categoryById[id]
      )
    }
  })

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "550px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "60px 0px",
      }}
    >
      <Box
        sx={{ width: "100%" }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0 0 50px 0",
          padding: "0"
        }}
      >
        <Grid container item xs={12} md={12} style={{ justifyContent: "center", alignContent: "center" }}>
          <AddTransactionAccordion
            walletArray={walletArray}
            incomeCategoryArray={incomeCategoryArray}
            expenseCategoryArray={expenseCategoryArray}
            inflowCategoryArray={inflowCategoryArray}
            outflowCategoryArray={outflowCategoryArray}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid container item xs={12} md={12} style={{ justifyContent: "center" }}>
          <FilterList
            walletById={walletById}
            currentPageWallets={currentPageWallets}
            page={searchParams.get('page') || 1}
          />
        </Grid>
      </Box>
      {openUpdate ?
        <TransactionModal
          open={openUpdate}
          setOpen={setOpenUpdate}
        // item={chosedId} 
        // handleCloseModal={handleCloseModal} 
        // description={walletById[chosedId].name}
        // amount={walletById[chosedId].classification}
        />
        : <></>
      }
      <Box
        sx={{ width: "100%" }}
        style={{
          border: "1px solid #f6f6f6",
          borderRadius: "10px",
          boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
        }}
      >
        <BackgroundFirstLayer>
          <Grid item xs={12} md={4}>
            <BackgroundSecondLayer
              style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px"
              }}
            >
              <Container
                style={{
                  minHeight: "50px",
                  display: "flex",
                  justifyContent: "space-around",
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
                    <Typography style={{ fontSize: "14px" }}>Inflow</Typography>
                  </Grid>
                  <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography style={{ fontSize: "14px" }}>{fNumber(50000000)}</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography style={{ fontSize: "14px" }}>Outflow</Typography>
                  </Grid>
                  <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography style={{ fontSize: "14px" }}>{fNumber(-10000000)}</Typography>
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
                    transactionsArray={trans[1]}
                  />
                )
              })}
            </List>
          </Grid>
        </BackgroundFirstLayer>
      </Box>
      <PaginationHandling
        page={searchParams.get('page') || 1}
        totalPages={totalPages}
        toRoute={"transs"}
      />
    </div>
  );
}

export { TransactionsList };
