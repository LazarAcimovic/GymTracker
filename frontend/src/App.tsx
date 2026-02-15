import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
