import "./App.css";
import Songs from "./components/Songs/Songs";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Song from "./components/Song/Song";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Songs />} />
                <Route path="/song/:song" element={<Song/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
