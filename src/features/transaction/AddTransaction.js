import React from 'react';
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import {
    Grid,
    Card,
    Container,
    Box,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Autocomplete,
    Accordion,
    AccordionDetails,
    AccordionActions
} from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTransaction } from './transactionSlice';
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { SmallTextField } from "../../components/form/CustomizedTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SmallButton } from '../../components/CustomizedButton';
import DatePicker from 'react-date-picker';

const CreateTransSchema = yup.object().shape({
    amount: yup.string().typeError("Only number letters are allowed")
        .matches(/[0-9]+(\.[0-9][0-9]?)?/, {
            message: 'Integer number only.  Example 27',
            excludeEmptyString: true
        })
        .required("Amount is required"),
    description: yup.string().required("Description is required"),

})

const defaultValues = {
    fromWallet: null,
    toWallet: null,
    fromCategory: null,
    toCategory: null,
    amount: null,
    date: new Date(),
    description: "Description"
};

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

function AddTransactionContainer({ children }) {
    return (
        <Container
            style={{
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                flexWrap: "wrap",
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

function AutoCompleteList({ id, name, children, sourceArray, ...other }) {
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
                        onChange={(event, value) => field.onChange(value)}
                        options={sourceArray}
                        getOptionLabel={sourceArray => sourceArray.name || ""}
                        isOptionEqualToValue={(sourceArray, value) => {
                            if (value.name) return sourceArray.name === value.name
                            return true
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label={children}
                                    required
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    {...other}
                                    sx={{
                                        '&	input': {
                                            fontSize: '12px',
                                            minWidth: '90px'
                                        },
                                        '& label': {
                                            fontSize: '12px'
                                        }
                                    }}
                                />
                            )
                        }}
                        clearIcon={false}
                        popupIcon={false}
                        style={{
                            width: "100%",
                            maxWidth: "350px",
                            height: "40px",
                            fontSize: "12px"
                        }}
                    />
                )
            }}
        />
    )
}

function CustomizedBox({ children }) {
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
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    color: "#4c4c4c",
                    borderRadius: "8px",
                    border: "1px solid rgba(0, 0, 0, 0.23)"
                }}
            >
                {children}
            </Box>
        </Grid>
    )
}

function AddTransactionAccordion({
    walletArray,
    incomeCategoryArray,
    expenseCategoryArray,
    inflowCategoryArray,
    outflowCategoryArray,
    type,
    setType
}) {
    const dispatch = useDispatch();
    const now = new Date()

    const methods = useForm({
        resolver: yupResolver(CreateTransSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        getValues,
        control,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {

        try {
            const { fromWallet, toWallet, fromCategory, toCategory, date, amount, description } = data
            let parseAmount = parseInt(amount.replaceAll(",", ""));

            if (fromCategory?._id && fromWallet?._id) {
                dispatch(createTransaction({
                    wallet: fromWallet._id,
                    category: fromCategory._id,
                    date,
                    amount: -parseAmount,
                    description
                }))
            }

            if (toCategory?._id && toWallet?._id) {
                dispatch(createTransaction({
                    wallet: toWallet._id,
                    category: toCategory._id,
                    date,
                    amount: parseAmount,
                    description
                }))
            }

            reset();
            return
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div style={{
            width: "100%",
            maxWidth: "350px",
            margin: "10px 0",
            boxSizing: "border-box"
        }}
        >
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>Add Transaction</p>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 16px" }} className={"classes.details"}>
                    <AddTransactionContainer>
                        <FormControl fullWidth>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={type || 1}
                                label="Type"
                                onChange={handleTypeChange}
                                style={{
                                    width: "100%",
                                    maxWidth: "350px",
                                    height: "40px"
                                }}
                            >
                                <MenuItem selected value={"1"}>Expense</MenuItem>
                                <MenuItem value={"2"}>Income</MenuItem>
                                <MenuItem value={"3"}>Transfer</MenuItem>
                            </Select>
                        </FormControl>

                        <FormProvider {...methods}>
                            <form
                                id="form-hook"
                                onSubmit={methods.handleSubmit(onSubmit)}
                                style={{ width: "100%" }}
                            >
                                <Grid container style={{ margin: "0" }}>
                                    {!!errors.responseError && (
                                        <Alert severity="error">{errors.responseError.message}</Alert>
                                    )}
                                    <Card sx={{ display: "grid", width: "100%", p: 1, rowGap: 2, overflow: "visible" }}>
                                        {
                                            type === "3" ? (
                                                <>
                                                    <Grid container item xs={12}
                                                        style={{ flexWrap: "noWrap", gap: "0 8px" }}
                                                    >
                                                        <Grid container item xs={12} md={6} style={{ gap: "8px" }}>
                                                            <AutoCompleteList
                                                                id={"fromCategory"}
                                                                name={"fromCategory"}
                                                                children={"Category"}
                                                                sourceArray={outflowCategoryArray}
                                                            />
                                                            <AutoCompleteList
                                                                id={"fromWallet"}
                                                                name={"fromWallet"}
                                                                children={"Wallet (Cash Out)"}
                                                                sourceArray={walletArray}
                                                            />
                                                        </Grid>
                                                        <Grid container item xs={12} md={6} style={{ gap: "8px" }}>
                                                            <AutoCompleteList
                                                                id={"toCategory"}
                                                                name={"toCategory"}
                                                                children={"Category"}
                                                                sourceArray={inflowCategoryArray}
                                                            />
                                                            <AutoCompleteList
                                                                id={"toWallet"}
                                                                name={"toWallet"}
                                                                children={"Wallet (Cash In)"}
                                                                sourceArray={walletArray}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
                                                : type === "2" ? (
                                                    <>
                                                        <AutoCompleteList
                                                            id={"toWallet"}
                                                            name={"toWallet"}
                                                            children={"Wallet (Cash In)"}
                                                            sourceArray={walletArray}
                                                        />
                                                        <AutoCompleteList
                                                            id={"toCategory"}
                                                            name={"toCategory"}
                                                            children={"Category"}
                                                            sourceArray={incomeCategoryArray}
                                                        />
                                                    </>
                                                )
                                                    : (
                                                        <>
                                                            <AutoCompleteList
                                                                id={"fromWallet"}
                                                                name={"fromWallet"}
                                                                children={"Wallet (Cash Out)"}
                                                                sourceArray={walletArray}
                                                            />
                                                            <AutoCompleteList
                                                                id={"fromCategory"}
                                                                name={"fromCategory"}
                                                                children={"Category"}
                                                                sourceArray={expenseCategoryArray}
                                                            />
                                                        </>
                                                    )

                                        }

                                        <SmallTextField name="description" label="Description" />
                                        <Grid container item xs={12}
                                            style={{ flexWrap: "noWrap", gap: "0 8px" }}
                                        >
                                            <CustomizedBox>
                                                <Controller
                                                    control={control}
                                                    name="date"
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

                                            </CustomizedBox>
                                            <Grid item xs={12} md={6}>
                                                <SmallTextField name="amount" label="Amount" />
                                            </Grid>
                                        </Grid>

                                    </Card>
                                </Grid>
                            </form>
                        </FormProvider>
                    </AddTransactionContainer>
                </AccordionDetails>
                <AccordionActions>
                    <SmallButton form={"form-hook"} type={"submit"} text={"Save"} />
                </AccordionActions>
            </Accordion>
        </div>
    )
}


export { AddTransactionAccordion, AccordionSummary, CustomizedBox, AddTransactionContainer, AutoCompleteList } 