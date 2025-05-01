import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import CreationAmountsDisplay from './ui/creation/creationAmounts';
import NavigationButtonsDisplay from './ui/creation/navigationButtonsDisplay';
import { GameEngineProvider } from './ui/game-engine-context';
import MainPanel from './ui/main-panel';
import { UiControllerProvider } from './ui/ui-controller-context';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
  return (
    <GameEngineProvider>
      <UiControllerProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MainPanel />
          <Box style={{ position: "sticky", bottom: 0, backgroundColor: "black" }}>
            <CreationAmountsDisplay />
            <NavigationButtonsDisplay />
          </Box>
        </ThemeProvider>
      </UiControllerProvider>
    </GameEngineProvider>
  );
}

export default App;

