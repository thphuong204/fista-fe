import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LoadingScreen from "../components/LoadingScreen";
import { FilterList } from "../features/transaction/FilterList";
import { WalletOptionBox } from "../features/transaction/TransactionsList";
import { PieChart, BarChart } from "../features/report";

function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("loading", loading)
  useEffect(()=> {
    setLoading(false)
  },[])

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
                <FilterList WalletOptionBox={WalletOptionBox}/>
              </Grid>

              <Grid item xs={12}>
                <BarChart
                  title="Income vs Expense"
                  subheader="(+43%) than last year"
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
                  chartData={[
                    { label: 'America', value: 4344 },
                    { label: 'Asia', value: 5435 },
                    { label: 'Europe', value: 1443 },
                    { label: 'Africa', value: 2443 },
                  ]}
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
                  chartData={[
                    { label: 'America', value: 4344 },
                    { label: 'Asia', value: 5435 },
                    { label: 'Europe', value: 1443 },
                    { label: 'Africa', value: 4443 },
                  ]}
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