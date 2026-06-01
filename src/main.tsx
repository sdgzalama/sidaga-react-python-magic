import { createRoot } from "react-dom/client";
import { StartProvider } from "@tanstack/react-start";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document.getElementById("app")!).render(
  <StartProvider router={router}>
    <router.App />
  </StartProvider>,
);