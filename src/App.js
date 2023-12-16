import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header/Header";
import Professional from "./components/Professional/Professional";
import Travel from "./components/Travel/Travel";
import Music from "./components/Music/Music";
import Photography from "./components/Photography/Photography";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/professional" element={<Professional />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/music" element={<Music />} />
          <Route path="/photography" element={<Photography />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
