import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Grid,
    Card, 
    Box,
    TextField,
    Autocomplete,
    Accordion,
    AccordionDetails,
    AccordionActions
} from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { SmallTextField } from "../../components/form/CustomizedTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectingContainer } from "./FilterList";
import { SmallButton } from '../../components/CustomizedButton';
import DatePicker from 'react-date-picker';

const typeArray = [
    {_id: "1", name: 'Expense'},
    {_id: "2", name: 'Income'},
    {_id: "3", name: 'Transfer'},
]

const CreateTransSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    wallet: yup.string().required("Wallet is required"),
    category: yup.string().required("Category is required"),
    amount: yup.string().required("Amount is required"),
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

function AutoCompleteList ({ id, name, children, sourceArray}) {
    const {control}  = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ 
                field, 
                fieldState: { error }
            }) => (
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
                            <TextField 
                                {...params} 
                                label={children} 
                            />
                        )
                    }}
                    style={{
                        width: "100%",
                        maxWidth: "350px",
                        height: "40px"
                    }}
                />
            )}
        />
    )
}

function CustomizedBox ({ children }) {
    return (
        <Grid item xs={12} md={6}>
          <Box
              style={{ 
                height: "40px",
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

function AddTransactionAccordion ({walletArray, categoryArray}) {
    const now = new Date()
    const [valueFirst, onChangeFirst] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
    const defaultValues = {
        type: "Expense",
        wallet: "",
        category: "",
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
    getValues,
    control,
    setError,
    reset,
    formState: { error, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        console.log("data", data)
        return data
    };

    useEffect(() => {
        console.log("getValues", getValues())
    })
    
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
                            <form id="form-hook" onSubmit={methods.handleSubmit(onSubmit)} style={{width: "100%"}}>
                                <Grid container style={{ margin: "0" }}>
                                    <Card sx={{ display: "grid", width:"100%", p: 1, rowGap: 2 }}>
                                            <AutoCompleteList 
                                                id={"type"}
                                                name={"type"}
                                                children={"Type"} 
                                                sourceArray={typeArray}
                                            />
                                            <AutoCompleteList 
                                                id={"wallet"}
                                                name={"wallet"}
                                                children={"Wallet"}
                                                sourceArray={walletArray}
                                            />
                                            <AutoCompleteList 
                                                id={"category"}
                                                name={"category"}
                                                children={"Category"} 
                                                sourceArray={categoryArray}
                                            />
                                            <SmallTextField name="description" label="Description"/>
                                            <Grid container item xs={12}
                                                style={{ flexWrap: "noWrap", gap: "0 8px"}}
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
                                                <SmallTextField name="amount" label="Amount"/>
                                                </Grid>
                                            </Grid>
                                            
                                    </Card>
                                </Grid>
                            </form>
                        </FormProvider>
                    </SelectingContainer>
                </AccordionDetails>
                <AccordionActions>
                  <SmallButton form={"form-hook"} type={"submit"} text={"Save"}/>
                </AccordionActions>
            </Accordion>
        </div>
    )
}


export { AddTransactionAccordion } 