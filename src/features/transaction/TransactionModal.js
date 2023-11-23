import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Autocomplete, Box, Card, Grid, Modal, TextField } from '@mui/material';
import * as React from 'react';
import DatePicker from 'react-date-picker';
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { SmallButton } from '../../components/CustomizedButton';
import { SmallTextField } from "../../components/form/CustomizedTextField";
import { CustomizedBox } from "./AddTransaction";
import { changeTransaction } from './transactionSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#fffaf0',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

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
                                                minWidth: '90px'
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

const EditTransactionSchema = yup.object().shape({
    date: yup.string().typeError("date is required").required("date is required"),
    description: yup.string().typeError("description is required").required("description is required"),
})

const defaultValues = {
    date: '',
    description: null,
};

function TransactionModal({ open, setOpen, item, handleCloseModal, date, amount, description }) {
    const handleOpenModal = () => setOpen(true);
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(EditTransactionSchema),
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
            console.log("data", data)
            const { date, classification } = data

            await dispatch(changeTransaction({
                _id: item,
                date,
            }))
            reset();
            handleCloseModal();
            return
        } catch (error) {
            reset();
            console.log("error", error)
            setError("responseError", error);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormProvider {...methods}>
                        <form
                            id="transaction-modal"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            style={{ width: "100%", marginBottom: "10px" }}
                        >
                            <p style={{ margin: "8px 0", fontSize: "18px", fontWeight: "bold", textTransform: "capitalize" }}>{`Update Wallet '${description}': ${amount}`}</p>
                            <Grid container style={{ margin: "0px" }}>
                                {!!errors.responseError && (
                                    <Alert severity="error">{errors.responseError.message}</Alert>
                                )}
                                <Card sx={{ display: "grid", width: "100%", p: 1, rowGap: 2, overflow: "visible" }}>

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
                                    <SmallTextField name="description" label="Description" />
                                    <SmallTextField date="date" label="date" />
                                </Card>
                            </Grid>

                        </form>
                    </FormProvider>
                    <Grid container style={{ justifyContent: "center" }}>
                        <SmallButton form={"transaction-modal"} type={"submit"} text={"Update"} />
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export { TransactionModal };
