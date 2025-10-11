import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { theme } from './theme';
import { GraphProvider } from './providers/GraphProvider';
import { GraphCanvas } from '../components/GraphCanvas/GraphCanvas';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GraphProvider>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            bgcolor: 'background.default',
          }}
        >
          <GraphCanvas />
          <ControlPanel />
          <Box
            component="footer"
            sx={{
              position: 'fixed',
              right: 16,
              bottom: 16,
              opacity: 0.5,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 0.8,
              },
              zIndex: 1000,
              pointerEvents: 'auto',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Built with React + TypeScript + Vite + MUI
            </Typography>
          </Box>
        </Box>
      </GraphProvider>
    </ThemeProvider>
  );
}

export default App;
