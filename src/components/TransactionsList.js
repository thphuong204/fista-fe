import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { 
  Box, 
  Grid, 
  List, 
  Typography, 
  Container, 
  InputBase,  
  Button, 
  Pagination, 
  PaginationItem, 
  Autocomplete,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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

function TransactionsByDate () {
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
          <Typography>Date</Typography>
        </Box>
        <Box>
          {["date 1", "date 2", "date non 3", "date ytest thu cai 4"].map((value, i) => {
            return (
              <Grid container spacing={2} style={{ width: "100%", margin:"0", padding: "2px 0"}}
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

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let page = params.get("page"); // "instagram"  
    page = parseInt(page) || 1;

    function PaginationHandling({  }) {
      return (
      <div className="pagination-item"
                  style={{
                    minWidth: "50%",
                    minHeight: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    marginTop: "60px",
                    backgroundColor: "#fffaf0",
                    boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
                  }}>
                <Pagination
                    page={page}
                    count={300}
                    showFirstButton 
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem
                            style={{
                                fontSize: "14px",
                                color: "#4c4c4c"
                            }}
                            component={Link}
                            to={`/transs?page=${item.page || 1}`}
                            {...item}
                            onClick={(e) => {
                              console.log(e);}}
                        />
                    )}
                />
        </div>
      )
    }

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
      <Container 
        style={{
          margin: "0 0 50px 0",
          padding: "0"
        }}
      > 
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
      </Container>
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
                  <Button 
                    style={{ 
                      fontWeight: "bold",
                      backgroundColor: "#ffde8a",
                      color: "#4c4c4c"
                    }}
                  >
                      LAST MONTH
                  </Button>
                  <Button 
                    style={{ 
                      fontWeight: "bold",
                      backgroundColor: "#ffde8a",
                      color: "#4c4c4c"
                    }}
                  >
                      THIS MONTH
                  </Button>
                  <Button 
                    style={{ 
                      fontWeight: "bold",
                      backgroundColor: "#ffde8a",
                      color: "#4c4c4c"
                    }}
                  >
                      NEXT MONTH
                  </Button>
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
              < TransactionsByDate/>
              < TransactionsByDate/>
            </List>
          </Grid>
        </BackgroundFirstLayer>
      </Box>
      < PaginationHandling />
    </div>
  );
}

export default TransactionsList