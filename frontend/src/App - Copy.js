import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Components/Form';
// import Table from './Components/Table';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/employee" element={<Table />} />
      </Routes>
    </Router>
  );
};

export default App;