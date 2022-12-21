import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FTextField } from "../components/form";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});
const defaultValues = {
  username: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
      <Stack spacing={3} sx={{ minWidth: "350px" }}>
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>

        <FTextField name="username" label="Username" />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
  );
}

export default LoginPage;