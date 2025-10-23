import { createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/fonts/pretendard.css";
import "./index.css";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Pretendard, Arial, sans-serif",
      lineHeight: "1.8",
      letterSpacing: "normal",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
