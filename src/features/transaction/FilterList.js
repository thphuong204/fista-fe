import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { 
    Grid, 
    Container, 
    Button,
    InputBase, 
  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from 'react-date-picker';

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

function FilterList ( { WalletOptionBox }) {
    const [valueFirst, onChangeFirst] = useState(new Date());
    const [valueSecond, onChangeSecond] = useState(new Date());

     return (
        <>
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
                From Date: 
                <DatePicker onChange={onChangeFirst} value={valueFirst} />
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
                To Date:
                <DatePicker onChange={onChangeSecond} value={valueSecond} />
              </Button>
            </Container>
          </Grid>
        </>
     )
}

export default FilterList