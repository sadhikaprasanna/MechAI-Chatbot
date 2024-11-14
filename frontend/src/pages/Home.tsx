import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Tabs, Tab, Container } from '@mui/material';

// Define the Home component
const Home: React.FC = () => {
  // Manage selected tab state
  const [selectedTab, setSelectedTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* NavBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>CarGPT</Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main content layout */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: 3 }}>
        {/* Sidebar */}
        <Box sx={{ width: '20%', bgcolor: 'grey.200', padding: 2 }}>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
            <Tab label="Tab 4" />
          </Tabs>
        </Box>

        {/* Main content area */}
        <Box sx={{ flex: 1, padding: 3, overflowY: 'auto' }}>
          <Typography variant="h4" gutterBottom>Introducing CarGPT</Typography>
          <Typography paragraph>
            Content explaining CarGPT and its features.
          </Typography>
          <Button variant="contained" color="primary">Start Chat Car</Button>
          
          {/* Add more content */}
          <Typography variant="h6" sx={{ mt: 4 }}>How It Works</Typography>
          <Typography paragraph>
            This section describes how CarGPT works, including a step-by-step guide on interacting with the chatbot.
          </Typography>
          <Typography paragraph>
            Step 1: Describe your car issue in simple terms.
          </Typography>
          <Typography paragraph>
            Step 2: Our chatbot will analyze the issue and offer suggestions or solutions.
          </Typography>
          {/* Add more steps as needed */}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', padding: 2, display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography>© 2024 CarGPT</Typography>
        <Box>
          <Button color="inherit" href="/privacy">Privacy Policy</Button>
          <Button color="inherit" href="/contact" sx={{ ml: 2 }}>Contact Us</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
