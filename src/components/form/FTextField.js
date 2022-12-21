import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, ...other }) {
  const {control}  = useForm();
  console.log(useForm());

  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field, 
        fieldState: { error }
      }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;