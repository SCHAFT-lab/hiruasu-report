import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { MorningForm } from './pages/MorningForm';
import { NightForm } from './pages/NightForm';
import { History } from './pages/History';
import { Manual } from './pages/Manual';
import { LogProvider } from './context/LogContext';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <LogProvider>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/morning" element={<MorningForm />} />
              <Route path="/night" element={<NightForm />} />
              <Route path="/history" element={<History />} />
              <Route path="/manual" element={<Manual />} />
            </Routes>
          </main>
          <Navigation />
        </div>
      </LogProvider>
    </Router>
  );
}

export default App;
