import { Navbar } from '@components/Navbar/Navbar';
import Box from '@mui/material/Box/Box';
import { Outlet } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

export const AppContainer = () => {
  return (
    <Box sx={styles.container}>
      <Navbar />
      <Outlet />
    </Box>
  );
};
