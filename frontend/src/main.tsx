import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfileSettingsProvider } from "./context/ProfileSettingsContext";
import { LocaleProvider } from "./i18n/LocaleContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>

        <LocaleProvider>
          <ProfileSettingsProvider>

              <App />

          </ProfileSettingsProvider>
        </LocaleProvider>

    </AuthProvider>
  </StrictMode>
);
