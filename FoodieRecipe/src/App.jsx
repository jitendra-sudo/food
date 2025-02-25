import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/firstPage";
import Dashboard from "./components/dashboard";
import RecipeView from "./components/main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<RecipeView />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
