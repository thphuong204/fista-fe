import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Button, 
    Grid,
    Card, 
    TextField,
    Autocomplete,
    Accordion,
    AccordionDetails,
    AccordionActions
} from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, FormProvider } from "react-hook-form";
import { SmallTextField } from "../../components/form/CustomizedTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectingContainer } from "./FilterList";
import { SmallButton } from '../../components/CustomizedButton';

const CreateTransSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
});

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

const typeArray = [
    { label: 'Expense'},
    { label: 'Income'},
    { label: 'Transfer'},
]

const walletArray =[
    { label: 'Expense'},
    { label: 'Income'},
    { label: 'Transfer'},
]

const categoryArray = [
    { label: 'Expense'},
    { label: 'Income'},
    { label: 'Transfer'},
]

function AutoCompleteList ({ children, sourceArray }) {
    return (
        <Autocomplete
            size="small"
            disablePortal
            id={children}
            options={sourceArray}
            renderInput={(params) => <TextField {...params} label={children} />}
            style={{
                width: "100%",
                maxWidth: "350px",
                height: "40px"
            }}
        />
    )
}

function AddTransactionButton () {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ isLoading ] = React.useState(false);

    const open = Boolean(anchorEl);

    const defaultValues = {
        wallet: "Wallet",
        category: "Category",
        amount: "0",
        date: new Date(),
        description: "Description"
    };

    const methods = useForm({
        resolver: yupResolver(CreateTransSchema),
        defaultValues,
    });
    
    const {
    handleSubmit,
    formState: { isSubmitting },
    } = methods;

    const onSubmit = (data) => {
    console.log("a")
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
                    <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold"}}>Add Transaction</p>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 16px" }} className={"classes.details"}>
                    <SelectingContainer>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} style={{width: "100%"}}>
                                <Grid container style={{ margin: "0" }}>
                                    <Card sx={{ display: "grid", width:"100%", p: 1, rowGap: 2 }}>
                                            <AutoCompleteList children={"Type"} sourceArray={typeArray}/>
                                            <AutoCompleteList children={"Wallet"} sourceArray={walletArray}/>
                                            <AutoCompleteList children={"Category"} sourceArray={categoryArray}/>
                                            <SmallTextField name="description" label="Description"/>
                                            <Grid container item xs={12}
                                                style={{ flexWrap: "noWrap", gap: "0 8px"}}
                                            >
                                                <SmallTextField name="date" label="Date" />
                                                <SmallTextField name="amount" label="Amount"/>
                                            </Grid>
                                            
                                    </Card>
                                </Grid>
                            </form>
                        </FormProvider>
                    </SelectingContainer>
                </AccordionDetails>
                <AccordionActions>
                  <SmallButton text={"Cancel"}/>
                  <SmallButton text={"Save"}/>
                </AccordionActions>
            </Accordion>
        </div>
    )
}


export { AddTransactionButton } 