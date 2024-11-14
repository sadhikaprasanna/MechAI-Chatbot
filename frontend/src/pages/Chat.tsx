import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import red from '@mui/material/colors/red';
import { IoMdSend } from 'react-icons/io';
import Chatitem from '../components/chat/Chatitem';
import { sendChatRequest } from '../helpers/api-communicators';

type Message = {
    role: "user" | "assistant";
    content: string;
};

const Chat = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const auth = useAuth();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
    
        const newMessage: Message = { role: "user", content };
        setChatMessages((prev) => [...prev, newMessage]);
    
        const chatData = await sendChatRequest(content);
    
        // Check if chatData has the expected format
        if (chatData && chatData.response) {
            const botMessage: Message = { role: "assistant", content: chatData.response };
            setChatMessages((prev) => [...prev, botMessage]);
        } else {
            console.error("Unexpected chat response format:", chatData);
        }
    };
    
    
    

    const getInitials = () => {
        const name = auth?.user?.name || "";
        const nameParts = name.split(" ");
        const firstInitial = nameParts[0]?.[0] || "";
        const lastInitial = nameParts[1]?.[0] || "";
        return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                width: "100%",
                height: "100%",
                mt: 3,
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: { md: "flex", xs: "none", sm: "none" },
                    flex: 0.2,
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "60vh",
                        bgcolor: "black",
                        borderRadius: 2,
                        mx: 3,
                        gap: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: "white", color: "black", fontWeight: 700 }}>
                        {getInitials()}
                    </Avatar>
                    <Typography sx={{ fontFamily: "Work Sans", color: "white" }}>
                        You are talking to a chatbot.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Work Sans",
                            color: "white",
                            textAlign: "center",
                            px: 3,
                        }}
                    >
                        You can ask questions related to cars and their problems which our chatbot
                        can solve.
                    </Typography>
                    <Button
                        sx={{
                            width: "200px",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: 3,
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400,
                            },
                        }}
                    >
                        Clear conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
                <Typography
                    sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto" }}
                >
                    Hello! How can I help you?
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: "60vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        msOverflowY: "auto",
                        scrollBehavior: "smooth",
                    }}
                >
                    {chatMessages.map((chat, index) => (
                        <Chatitem content={chat.content} role={chat.role} key={index} />
                    ))}
                </Box>
                <div
                    style={{
                        width: "100%",
                        padding: "20px",
                        borderRadius: 8,
                        backgroundColor: "rgb(17,27,39)",
                        display: "flex",
                        margin: "auto",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            padding: "10px",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "20px",
                        }}
                    />
                    <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" }}>
                        <IoMdSend />
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
};

export default Chat;
