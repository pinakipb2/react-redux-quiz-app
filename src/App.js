import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizHome from './components/QuizHome';
import Results from './components/Results';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<QuizHome />} />
        <Route path="/result" element={<Results />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
