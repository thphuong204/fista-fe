import React from 'react';
import {Card, CardContent,  Divider, Typography} from '@mui/material';
import { FTextField } from '../../components/form';
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const defaultValues = {
    walletName: "wallet",
    currency:"vnd"
};

function WalletDetails({walletObject}) {

    const schema = yup.object().shape({
        walletName: yup
            .string()
            .required('Required'),
        currency: yup
            .string()
            .required('Required')
    })

    let location = useLocation();
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
      });
    
      const onSubmit = async (data) => {
    
        let from = location.state?.from?.pathname || "/";
      };

    return (
        <div    
            className="walletCard" 
            style= {{
                display: "flex", 
                justifyContent: "center",
                marginTop: "50px"
                }}
        >
            <Card 
                id={walletObject?.id}
                sx= {{
                    width:{ xs:"420px",md:"300px" },
                    minHeight:{ xs:"280px",md:"200px" },
                }}
                style= {{ padding: "0 10px", backgroundColor: "#fffcf5" }}
            >
                <CardContent
                sx={{
                    padding:{ xs:"0px" } 
                }}
                >
                    <Typography
                        className="walletTitle"
                        gutterBottom
                        component="div" 
                        sx={{
                            height:{ xs:"30px",md:"40px" },
                            padding:{ xs:"0px", md:"0px" },
                        }}
                    >
                    {`Add wallet`}
                    </Typography>
                    <Divider variant="middle" color="black" sx={{margin: { sx:"1px",md:1 }}} />
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FTextField 
                                name="walletIcon" label="Wallet Icon" 
                                style={{margin: "10px 0"}}
                            />
                            <FTextField 
                                name="walletName" label="Wallet Name"
                                style={{margin: "10px 0"}}
                            />
                            <FTextField 
                                name="currency" label="Currency"
                                style={{margin: "10px 0"}}
                            />
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
}

export default WalletDetails