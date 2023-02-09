import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getWallets} from '../features/wallet/walletSlice';
import {getCategories} from '../features/category/categorySlice';
import {getReports} from '../features/report/reportSlice';
import { Box, Container, Stack, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LoadingScreen from "../components/LoadingScreen";
import { ReportFilterList } from "../features/report/ReportFilterList";
import { PieChart, BarChart } from "../features/report";

function ReportPage() {
  const now = new Date()
  const [wallet] = useState("All");
  const [fromDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [toDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();

  useEffect(()=> {
    setLoading(false);
    dispatch(getWallets( 1, "all" ));
    dispatch(getCategories( 1, "all" ));
    dispatch(getReports({ wallet, fromDate, toDate }));
  },[])

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

  const { 
    groupByCategory, 
    groupByMonth,
    groupByWeek
  } = useSelector(
    (state) => state.report
  );
  
  const expenseCategoriesArray = [];
  const incomeCategoriesArray = [];

  if (groupByCategory?.length > 0) {
    groupByCategory.forEach((item) => {
      if (categoryById[item._id].classification === "expense") {
        const tmpItem = {
          _id: item._id,
          label: categoryById[item._id].name,
          value: -item.totalAmount,
          classification: "expense"
        };
        expenseCategoriesArray.push(tmpItem)
      }
    })
  }

  if (groupByCategory?.length > 0) {
    groupByCategory.forEach((item) => {
      if (categoryById[item._id].classification === "income") {
        const tmpItem = {
          _id: item._id,
          label: categoryById[item._id].name,
          value: item.totalAmount,
          classification: "income"
        };
        incomeCategoriesArray.push(tmpItem)
      }
    })
  }
  
  const revisedGroupByWeek = [];
  const revisedGroupByMonth= [];
  if (groupByMonth?.length >0) {
    groupByMonth.map((item) => {
      let tmpIncomeAmount = 0;
      let tmpExpenseAmount = 0;
      const tmpItem = {
        month: item?._id,
        totalAmount: item?.totalAmount
      }
      item.transactions.map((transaction) => {

        if (categoryById[transaction.category]?.classification === "income") {
         tmpIncomeAmount += parseFloat(transaction.amount);
        }
        if (categoryById[transaction.category]?.classification === "expense") {
         tmpExpenseAmount += parseFloat(transaction.amount);
        }
        
      })
      tmpItem.income = tmpIncomeAmount;
      tmpItem.expense = tmpExpenseAmount
      revisedGroupByMonth.push(tmpItem)
    })
  }
  if (groupByWeek?.length >0) {
    groupByWeek.map((item) => {
      let tmpIncomeAmount = 0;
      let tmpExpenseAmount = 0;
      const tmpItem = {
        week: item?._id,
        totalAmount: item?.totalAmount
      }
      item.transactions.map((transaction) => {

        if (categoryById[transaction.category]?.classification === "income") {
         tmpIncomeAmount += parseFloat(transaction.amount);
        }
        if (categoryById[transaction.category]?.classification === "expense") {
         tmpExpenseAmount += parseFloat(transaction.amount);
        }
        
      })
      tmpItem.income = tmpIncomeAmount;
      tmpItem.expense = tmpExpenseAmount
      revisedGroupByWeek.push(tmpItem)
    })
  }

  const label = revisedGroupByMonth.map((item) => item.month.toString())
  const expenseData = revisedGroupByMonth.map((item) => -item.expense)
  const incomeData = revisedGroupByMonth.map((item) => item.income)
  console.log("revisedGroupByMonth after", revisedGroupByMonth)
  console.log("expenseData after", expenseData)
  console.log("incomeData after", incomeData)
  const theme = useTheme();

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack style={{ width: "100%"}}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <Grid container spacing={3}>
              <Grid container item xs={12} md={12} style={{ justifyContent: "center" }}>
                <ReportFilterList walletById={walletById} currentPageWallets={currentPageWallets} />
              </Grid>

              <Grid item xs={12}>
                <BarChart
                  title="Income vs Expense"
                  chartLabels={label}
                  chartData={[
                    {
                      name: 'Expense',
                      type: 'column',
                      fill: 'solid',
                      data: [incomeData],
                    },
                    {
                      name: 'Income',
                      type: 'area',
                      fill: {
                        opacity: [0.5, 0.25, 0.5],
                      },
                      data: [expenseData],
                    }
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <PieChart
                  title="Income"
                  chartData={incomeCategoriesArray}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PieChart
                  title="Expense"
                  chartData={expenseCategoriesArray}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default ReportPage;