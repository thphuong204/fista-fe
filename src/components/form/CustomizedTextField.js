import { useFormContext, Controller } from "react-hook-form";
import MuiTextField from '@mui/material/TextField';

function SmallTextField({ name, ...other }) {
  const {control}  = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field, 
        fieldState: { error }
      }) => (
        <MuiTextField
          size="small"
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

export  { SmallTextField };