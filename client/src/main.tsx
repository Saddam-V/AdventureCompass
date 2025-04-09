import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register required motion features
import { domAnimation, LazyMotion } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domAnimation}>
    <App />
  </LazyMotion>
);
