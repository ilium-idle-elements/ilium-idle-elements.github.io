import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import { GameEngineProvider } from './ui/game-engine-context';
import MainPanel from './ui/main-panel';
import MiniDrawer, { MiniDrawerAppBar } from './ui/navigation-drawer';
import { UiControllerProvider } from './ui/ui-controller-context';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
  return (
    <GameEngineProvider>
      <UiControllerProvider>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MiniDrawerAppBar />
            <MiniDrawer />
            <MainPanel />
          </Box>
        </ThemeProvider>
      </UiControllerProvider>
    </GameEngineProvider>
  );
}

export default App;

