import { useFormContext, Controller } from "react-hook-form";
import MuiTextField from '@mui/material/TextField';
import { fNumber } from "../../utils/formatNumber";

function SmallTextField({ name, ...other }) {
  const {control}  = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ 
        field, 
        fieldState: { error }
      }) => {
        if (name==="amount") {
          return (
            <MuiTextField
            size="small"
            {...field}
            fullWidth
            value={fNumber(field.value)}
            error={!!error}
            helperText={error?.message}
            {...other}
            sx={{
              '&	input': {
                  fontSize: '12px',
                  textTransform: "capitalize"
              },
              '& label': {
                  fontSize: '12px'
              },
            }}
            />
          )
        } else {
          return (
            <MuiTextField
            size="small"
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            sx={{
              
              '&	input': {
                  fontSize: '12px',
                  textTransform: "capitalize",
                  backgroundColor: other?.background_color,
                  boxShadow: other?.box_shadow,
                  borderRadius: other?.border_radius
              },
              '& label': {
                  fontSize: '12px'
              }
            }}
            />
          )
        }
      }
    }
    />
  );
}

export  { SmallTextField };