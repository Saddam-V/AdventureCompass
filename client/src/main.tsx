import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register required motion features
import { domAnimation, LazyMotion } from "framer-motion";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </ThemeProvider>
);
