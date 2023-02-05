import * as React from 'react';
import { useDispatch } from "react-redux";
import {Box , Grid, Button, Modal, Card, Alert, Autocomplete, TextField} from '@mui/material';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeWallet, getWallets } from './walletSlice';
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { SmallTextField } from "../../components/form/CustomizedTextField";
import { SmallButton } from '../../components/CustomizedButton';
import { flexbox } from '@mui/system';

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

const EditWalletSchema = yup.object().shape({
  name: yup.string().typeError("Name is required").required("Name is required"),
})

const defaultValues = {
  name: '',
  classification: null,
};

function WalletModal({ open, setOpen, item, handleCloseModal, typeArray, nameValue, typeValue }) {
  const handleOpenModal = () => setOpen(true);
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(EditWalletSchema),
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
        const {name, classification} = data

        await dispatch(changeWallet({ 
            _id: item,
            name, 
            classification: classification.name
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
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider {...methods}>
              <form 
                  id="wallet-modal" 
                  onSubmit={methods.handleSubmit(onSubmit)} 
                  style={{width: "100%", marginBottom: "10px"}}
              > 
                  <p style={{ margin: "8px 0", fontSize: "18px", fontWeight: "bold", textTransform: "capitalize"}}>{`Update Wallet '${typeValue}': ${nameValue}`}</p>
                  <Grid container style={{ margin: "0px" }}>
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
                      </Card>
                  </Grid>
                  
              </form>
          </FormProvider>
            <Grid container style={{justifyContent: "center"}}>
                <SmallButton form={"wallet-modal"} type={"submit"} text={"Update"}/>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export {WalletModal}