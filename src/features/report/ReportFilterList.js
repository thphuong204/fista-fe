import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import { 
    Grid, 
    Container, 
    Box,
    Accordion,
    AccordionDetails,
    AccordionActions,
    Autocomplete,
    TextField
  } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-date-picker';
import { SmallButton } from '../../components/CustomizedButton';
import {getTransactions} from '../transaction/transactionSlice';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";

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
              height: "34.25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 12px",
              textTransform: "capitalize",
              textAlign: "left",
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

function WalletOptionBox({id, name, walletLists}) {
  const {control}  = useFormContext();
  return (

    <Controller
            name={name}
            control={control}
            render={({ 
                field, 
                fieldState: { error }
            }) => { 
                return  (
                  <Autocomplete
                    size="small"
                    {...field}
                    id={id}
                    options={walletLists}
                    getOptionLabel={ sourceArray => sourceArray.name || ""}
                    isOptionEqualToValue={(sourceArray, value) => {
                      if(value.name) return sourceArray.name === value.name
                      return true
                  }}
                    onChange={(event, value) => field.onChange(value)}
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
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        variant="filled"
                        label="Wallets" 
                        sx={{
                          '&	input': {
                              fontSize: "12px",
                              minWidth: "90px"
                          },
                          '& label': {
                              fontSize: "12px",
                              height: "14px"
                          },
                          '& .MuiInputBase-root': {
                            height: "34.25px",
                            paddingTop: "16px"
                          }
                      }}
                      />
                    )}
                  />
                );
            }}
      />
)}

function ReportFilterList ({ 
  walletById, 
  currentPageWallets, 
  valueFirst,
  valueSecond,
  walletOptValue,
  onChangeFirst,
  onChangeSecond,
  setWalletOptValue,
  page, 
  limit
}) {

    const FilterTransSchema = yup.object().shape({
      fromDate: yup.string().required("From Date is required"),
      toDate: yup.string().required("To Date is required"),
      
    })
    
    const defaultFilterValues = {
      wallet: walletOptValue,
      fromDate: valueFirst,
      toDate: valueSecond,
    };

    const methods = useForm({
      resolver: yupResolver(FilterTransSchema),
      defaultFilterValues,
    });
  
    const {
    handleSubmit,
    getValues,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
    } = methods;

    const walletArray =[{name: "All"}];
      currentPageWallets.forEach((id) => {
          walletArray.push(
            walletById[id]
          )
    })

    const dispatch = useDispatch();

    const handleFilter = async (e) => {
      console.log("data", e)
      const {wallet, fromDate, toDate, description} = e
      try {
        dispatch(getTransactions({ 
          wallet: wallet._id, 
          fromDate, 
          toDate,
          description,
          page, 
          limit 
        }))
        return 
      } catch (error) {
        reset();
        console.log("error", error)
        setError("responseError", error);
      }
    }

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
              <FormProvider {...methods}>
              <form 
                  id="form-filter" 
                  onSubmit={methods.handleSubmit(handleFilter)} 
                  style={{width: "100%"}}
              >
                  <SelectingContainer>
                      <WalletOptionBox 
                        id={"wallet"}
                        name={"wallet"}
                        walletLists={walletArray}
                      />
                  </SelectingContainer>
                  <SelectingContainer>
                    <SelectingBox>
                      <p style= {{ fontSize: "12px"}}>From: </p> 
                      <Controller
                        control={control}
                        id={"fromDate"}
                        name="fromDate"
                        render={({ field }) => (
                        <DatePicker 
                          onChange={(e) => field.onChange(e)}
                          selected={field.value}
                          value={field.value}
                          clearIcon={null}
                          calendarIcon={null}
                        />
                      )}
                      />
                    </SelectingBox>
                    <SelectingBox>
                      <p style= {{ fontSize: "12px"}}>To: </p>
                      <Controller
                        control={control}
                        id={"toDate"}
                        name={"toDate"}
                        render={({ field }) => (
                        <DatePicker 
                          onChange={(e) => field.onChange(e)}
                          selected={field.value}
                          value={field.value}
                          clearIcon={null}
                          calendarIcon={null}
                        />
                      )}
                      />
                    </SelectingBox>
                  </SelectingContainer>
                </form>
                </FormProvider>
                </AccordionDetails>
                <AccordionActions>
                  <SmallButton 
                    form={"form-filter"} 
                    type={"submit"} 
                    text={"Filter"} 
                  />
                </AccordionActions>
              </Accordion>
          </div>
     )
}

export  { ReportFilterList, SelectingContainer, WalletOptionBox }