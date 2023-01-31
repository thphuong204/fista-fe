import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Card, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { getUser } from "./userSlice";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountInfo() {
  const { user } = useAuth();
  const _id = window.localStorage.getItem("userId")
  const {isLoading, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(_id));
  }, [])

  const [defaultValues, setDefaultValues] =  useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });
  useEffect(()=> {
    setDefaultValues({
      name: currentUser?.name,
      email: currentUser?.email
    })
  }, [currentUser])

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("a")
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="name" label="Name" />
                <FTextField name="email" label="Email" disabled />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Save Changes
                </LoadingButton>
            </Stack>

            </Card>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}

export default AccountInfo;