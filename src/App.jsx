import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { MorningForm } from './pages/MorningForm';
import { NightForm } from './pages/NightForm';
import { History } from './pages/History';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/morning" element={<MorningForm />} />
            <Route path="/night" element={<NightForm />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
