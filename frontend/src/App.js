import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import AddCharacter from "./pages/AddCharacter";
import EditCharacter from "./pages/EditCharacter";  // ✅ Make sure it's imported
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/characters/:id/edit" element={<EditCharacter />} /> {/* ✅ Fix the edit route */}
        <Route path="/add-character" element={<AddCharacter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
