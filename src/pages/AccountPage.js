import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountInfo from "../features/user/AccountInfo";

function AccountPage() {
    const [currentTab, setCurrentTab] = useState("general");
  
    const ACCOUNT_TABS = [
      {
        value: "general",
        icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
        component: <AccountInfo />,
      }
    ];
  
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
  
        <Box sx={{ mb: 5 }} />
  
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    );
  }
  
  export default AccountPage;