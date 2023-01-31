import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { 
    Grid, 
    Container, 
    InputBase, 
    Box,
    Accordion,
    AccordionDetails,
    AccordionActions,
    Autocomplete,
    TextField
  } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-date-picker';
import { SmallButton } from '../../components/CustomizedButton';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
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

function SelectingContainer ({ children }) {
  return (
    <Container
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                margin: "0 0 16px 0",
                padding: "0"
              }}
    >
      {children}
    </Container>
  )
}

function SelectingBox ({ children }) {
  return (
      <Grid item xs={12} md={6}>
        <Box
            style={{ 
              height: "48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 12px",
              textTransform: "capitalize",
              textAlign: "left",
              fontSize: "16px",
              backgroundColor: "#fff",
              color: "#4c4c4c",
              borderRadius: "8px",
              boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87 )"
            }}
        >
          {children}
        </Box>
      </Grid>
  )
}

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  height: "40px",
  minHeight: "40px",
  '&.Mui-expanded':{
    minHeight: "40px",
    margin: "0 !important" 
  },
  '& div':{
    margin: "0 !important"
  },
}));



function WalletOptionBox({setACValue, walletLists}) {
  
  return (
    <Autocomplete
      size="small"
      id="combo-box"
      options={walletLists.map((option)=> option.name)}
      defaultValue={walletLists[0].name}
      onChange={(event, value) => setACValue(value)}
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

function FilterList ({ walletById, currentPageWallets }) {
    const now = new Date()
    const [valueFirst, onChangeFirst] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
    const [valueSecond, onChangeSecond] = useState(new Date());
    const [acValue, setACValue] = useState("All");
    
    const walletArray =[{name: "All"}];
      currentPageWallets.forEach((id) => {
          walletArray.push(
            walletById[id]
          )
    })

     return (
          <div
            style={{ 
              width:"100%",
              maxWidth: "350px",
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center",
              margin: "20px 0"
            }}
          >
            <Accordion style={{ width:"100%", backgroundColor:"#fffaf0" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel1-header"
              > 
                <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold"}}>Filter</p>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "8px 16px" }} className={"classes.details"}>
                  <SelectingContainer>
                      <WalletOptionBox setACValue={setACValue} walletLists={walletArray}/>
                      <Search style={{width: "100%", margin: "0"}}>
                          <SearchIconWrapper>
                            <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                          />
                      </Search>
                  </SelectingContainer>
                  <SelectingContainer>
                    <SelectingBox>
                      <p style= {{ fontSize: "14px"}}>From: </p> 
                      <DatePicker 
                        onChange={onChangeFirst} 
                        value={valueFirst} 
                        clearIcon={null}
                        calendarIcon={null}
                      />
                    </SelectingBox>
                    <SelectingBox>
                      <p style= {{ fontSize: "14px"}}>To: </p>
                      <DatePicker 
                        onChange={onChangeSecond} 
                        value={valueSecond}
                        clearIcon={null}
                        calendarIcon={null}
                      />
                    </SelectingBox>
                  </SelectingContainer>
                </AccordionDetails>
                <AccordionActions>
                  <SmallButton text={"Filter"}/>
                </AccordionActions>
              </Accordion>
          </div>
     )
}

export  { FilterList, SelectingContainer, WalletOptionBox }