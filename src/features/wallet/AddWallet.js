import React from 'react';
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import { 
    Grid,
    Card, 
    Container,
    Box,
    Alert,
    TextField,
    Autocomplete,
    Accordion,
    AccordionDetails,
    AccordionActions
} from '@mui/material';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createWallet, getWallets } from './walletSlice';
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { SmallTextField } from "../../components/form/CustomizedTextField";
import { SmallButton } from '../../components/CustomizedButton';
import {AddTransactionContainer, AccordionSummary} from '../transaction/AddTransaction'


const CreateWalletSchema = yup.object().shape({
    name: yup.string().typeError("Name is required").required("Name is required"),
})

const defaultValues = {
    name: '',
    classification: null,
    currency: 'vnd'
};

function AutoCompleteList ({ id, name, children, sourceArray, ...other}) {
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
                    onChange={(event, value) =>  field.onChange(value)}
                    options={sourceArray}
                    getOptionLabel={ sourceArray => sourceArray.name || ""}
                    isOptionEqualToValue={(sourceArray, value) => {
                        if(value.name) return sourceArray.name === value.name
                        return true
                    }}
                    renderInput={(params) => {
                        return (
                            <>
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
                                            minWidth: '90px',
                                            textTransform: "capitalize"
                                        },
                                        '& label': {
                                            fontSize: '12px'
                                        }
                                    }}
                                />
                            </>
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

function AddWalletAccordion ({typeArray}) {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(CreateWalletSchema),
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
            const {name, classification} = data

            await dispatch(createWallet({ 
                wallet: name, 
                classification: classification.name
            }))
            reset();
            return 
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };
    
    return (
        <div style={{
                width:"100%",
                maxWidth: "350px",
                margin: "10px 0",
                boxSizing: "border-box"
            }}
        >
            <Accordion style={{backgroundColor:"#fffaf0"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                > 
                    <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold"}}>Add Wallet</p>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 16px" }} className={"classes.details"}>
                    <AddTransactionContainer>
                        <FormProvider {...methods}>
                            <form 
                                id="form-wallet" 
                                onSubmit={methods.handleSubmit(onSubmit)} 
                                style={{width: "100%"}}
                            >
                                <Grid container style={{ margin: "0" }}>
                                {!!errors.responseError && (
                                    <Alert severity="error">{errors.responseError.message}</Alert>
                                )}
                                    <Card sx={{ display: "grid", width:"100%", p: 1, rowGap: 2, overflow: "visible" }}>
                                        
                                            <AutoCompleteList 
                                                id={"classification"}
                                                name={"classification"}
                                                children={"Type"}
                                                sourceArray={typeArray}
                                            />
                                            <SmallTextField name="name" label="Name"/>
                                            <SmallTextField disabled name="currency" label="Currency" value="VND"/>
                                    </Card>
                                </Grid>
                            </form>
                        </FormProvider>
                    </AddTransactionContainer>
                </AccordionDetails>
                <AccordionActions>
                  <SmallButton form={"form-wallet"} type={"submit"} text={"Save"}/>
                </AccordionActions>
            </Accordion>
        </div>
    )
}


export { AddWalletAccordion } 