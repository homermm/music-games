import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrosswordGame from './pages/CrosswordGame';
import GuessGameContainer from './features/guess-song/GuessGameContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guess-song" element={<GuessGameContainer />} />
        <Route path="/crossword" element={<CrosswordGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
