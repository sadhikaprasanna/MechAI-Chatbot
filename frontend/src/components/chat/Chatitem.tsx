import React from 'react'
import { Box,Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Chatitem  = ({
    content,
    role,
}: {
    content:string;
    role:"user"|"assistant";
}) => {
    const auth=useAuth();
    const getInitials = () => {
        const name = auth?.user?.name || "";
        const nameParts = name.split(" ");
        const firstInitial = nameParts[0]?.[0] || "";
        const lastInitial = nameParts[1]?.[0] || "";
        return `${firstInitial}${lastInitial}`.toUpperCase();
    };
    return role==="assistant" ? (
        <Box sx={{display:"flex",p:2,bgcolor:"#004d5612",my:2,gap:2}}>
            <Avatar sx={{ml:"0",bgcolor:"black",color:"white"}}>
            {getInitials()}
            </Avatar>
            <Box>
                <Typography fontSize={"20px"}>{content}</Typography></Box>
        </Box>
    ) : (
        <Box sx={{display:"flex",p:2,bgcolor:"#004d56",gap:2}}>
            <Avatar sx={{ml:"0"}}>
                <img src="LogoT.png" alt="logo" width={"30px"}/>
            </Avatar>
            <Box>
                <Typography fontSize={"20px"}>{content}</Typography></Box>
        </Box>
    );
};

export default Chatitem;