import { Outlet } from "react-router-dom";
import UserContextProvider from "../context/UserContext";
import { Typography } from "@mui/material";

const Root = () => {
    return (
        <UserContextProvider>
            <Outlet />
            <Typography component='footer' variant="p" sx={{ fontSize:12 , color: '#afacac', mt:4, textAlign:'center' }}>Copyright 2023© Gonzalo La Ferrera</Typography>
        </UserContextProvider>
    );
};

export default Root;
