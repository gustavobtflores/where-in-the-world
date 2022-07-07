import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
