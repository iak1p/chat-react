import { useEffect } from "react";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  useEffect(() => {
    localStorage.removeItem("currentChat");
  });
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
