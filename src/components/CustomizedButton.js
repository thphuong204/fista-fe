import React from "react";
import { Button } from "@mui/material";

function SmallButton({ form, type, text}) {

  return (
    <Button 
      size="small" 
      style={{ 
        margin: "0 10px",
        backgroundColor: "#ffde8a",
        color: "#000",
        boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87 )"
      }}
      type={type}
      form={form}
    >
      {text}
    </Button>
  )
}

export  { SmallButton };