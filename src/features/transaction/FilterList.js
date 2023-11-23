import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField
} from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import React from 'react';
import DatePicker from 'react-date-picker';
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from "yup";
import { SmallButton } from '../../components/CustomizedButton';
import { SmallTextField } from "../../components/form/CustomizedTextField";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function SelectingContainer({ children }) {
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

function SelectingBox({ children }) {
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
  '&.Mui-expanded': {
    minHeight: "40px",
    margin: "0 !important"
  },
  '& div': {
    margin: "0 !important"
  },
}));

function WalletOptionBox({ id, name, walletLists }) {
  const { control } = useFormContext();
  return (

    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error }
      }) => {
        return (
          <Autocomplete
            size="small"
            {...field}
            id={id}
            options={walletLists}
            getOptionLabel={sourceArray => sourceArray.name || ""}
            isOptionEqualToValue={(sourceArray, value) => {
              if (value.name) return sourceArray.name === value.name
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
                error={!!error}
                helperText={error?.message}
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
  )
}

function FilterList({
  walletById,
  currentPageWallets,
  walletOptValue,
  page
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  const FilterTransSchema = yup.object().shape({
    fromDate: yup.string().required("From Date is required"),
    toDate: yup.string().required("To Date is required"),
  })

  const defaultFilterValues = {
    wallet: walletOptValue,
    fromDate: searchParams.get('fromDate') || new Date(),
    toDate: searchParams.get('toDate') || new Date(),
    description: searchParams.get('description') || ""
  };

  const methods = useForm({
    resolver: yupResolver(FilterTransSchema),
    defaultValues: defaultFilterValues,
  });

  const {
    control,
    setError,
    reset
  } = methods;

  const walletArray = [{ name: "All" }];
  currentPageWallets.forEach((id) => {
    walletArray.push(
      walletById[id]
    )
  })

  const handleFilter = async (e) => {
    console.log("data wallet", e.wallet.name, " & e.wallet._id", e.wallet._id)
    const { wallet, fromDate, toDate, description } = e
    try {
      navigate(`?page=${page}&wallet=${wallet?._id}&fromDate=${fromDate}&toDate=${toDate}&description=${description}`)
    } catch (error) {
      reset();
      console.log("error", error)
      setError("responseError", error);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "350px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px 0"
      }}
    >
      <Accordion style={{ width: "100%", backgroundColor: "#fffaf0" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel1-header"
        >
          <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>Filter</p>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "8px 16px" }} className={"classes.details"}>
          <FormProvider {...methods}>
            <form
              id="form-filter"
              onSubmit={methods.handleSubmit(handleFilter)}
              style={{ width: "100%" }}
            >
              <SelectingContainer>
                <WalletOptionBox
                  id={"wallet"}
                  name={"wallet"}
                  walletLists={walletArray}
                />
                <SmallTextField
                  name="description"
                  label="Description"
                  background_color={"#fff"}
                  box_shadow={"1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87 )"}
                  border_radius={"8px"}
                />
              </SelectingContainer>
              <SelectingContainer>
                <SelectingBox>
                  <p style={{ fontSize: "12px" }}>From: </p>
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
                  <p style={{ fontSize: "12px" }}>To: </p>
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

export { FilterList, SelectingContainer, WalletOptionBox };
