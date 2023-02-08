import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getWallets} from '../features/wallet/walletSlice';
import {getCategories} from '../features/category/categorySlice';
import {getReports} from '../features/report/reportSlice';
import { Box, Container, Stack, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LoadingScreen from "../components/LoadingScreen";
import { FilterList } from "../features/transaction/FilterList";
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

  console.log("expenseCategoriesArray", expenseCategoriesArray)

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
                <FilterList walletById={walletById} currentPageWallets={currentPageWallets} />
              </Grid>

              <Grid item xs={12}>
                <BarChart
                  title="Income vs Expense"
                  chartLabels={[
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003',
                  ]}
                  chartData={[
                    {
                      name: 'Expense',
                      type: 'column',
                      fill: 'solid',
                      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    },
                    {
                      name: 'Income',
                      type: 'area',
                      fill: {
                        opacity: [0.5, 0.25, 0.5],
                      },
                      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
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