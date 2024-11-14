// Chatitem.tsx
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Chatitem = ({ content, role, initials }: { content: string; role: "user" | "assistant"; initials?: string }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: role === "user" ? 'flex-end' : 'flex-start',
                mb: 2,
                maxWidth: '80%',
            }}
        >
            {role === "user" && initials && (
                <Avatar sx={{ bgcolor: '#1976d2', marginRight: '10px' }}>{initials}</Avatar>
            )}
            <Box
                sx={{
                    bgcolor: role === "user" ? '#1976d2' : '#424242',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Typography>{content}</Typography>
            </Box>
            {role === "assistant" && initials && (
                <Avatar sx={{ bgcolor: '#424242', marginLeft: '10px' }}>{initials}</Avatar>
            )}
        </Box>
    );
};

export default Chatitem;
