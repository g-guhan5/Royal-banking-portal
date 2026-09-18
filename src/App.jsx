import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

/**
 * Main Content Controller
 * Conditionally renders Dashboard when user is logged in, or Login screen when logged out.
 */
function MainContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Login />;
}

/**
 * App Root Component
 * Wraps portal in ThemeProvider and AuthProvider contexts.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
