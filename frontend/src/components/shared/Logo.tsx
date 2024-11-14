import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return ( 
        <div style={{
            display: 'flex',
            marginRight: 'auto',
            alignItems: 'center',
            gap: '0px',
        }}> 
            <Link to={"/"}>
                <img 
                  src="LogoT.png" 
                  alt="MechAI logo" 
                  width="70px"
                  height="45px"
                  className='image-inverted'
                />
            </Link>
            <Typography 
                    sx={{
                        fontWeight: 800,
                        textShadow: '2px 2px 20px #000',
                        ml: 1,
                        fontSize: '20px'
                    }}
                >
                    MechAI
                </Typography>
        </div>
    );
};

export default Logo;
