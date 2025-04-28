import { Outlet } from "react-router-dom";
import { Header } from "./components";
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
