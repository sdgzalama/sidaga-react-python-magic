import { createRoot } from "react-dom/client";
import { Hydrate } from "@tanstack/react-start-client/Hydrate";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document.getElementById("app")!).render(
  <Hydrate>
    <router.App />
  </Hydrate>
);