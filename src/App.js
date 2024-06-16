import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddStudent from './components/AddStudent';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import EditMyCourses from './components/EditMyCourses';
import ViewMyCourses from './components/ViewMyCourses';

function App() {

return (
  <Router>
    <div className="App">
      
    </div>
    <Routes>
      <Route index element={<Login/>} />
      <Route path="add/student" element={<AddStudent/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/view-course/:id" element={<ViewMyCourses/>} />
      <Route path="/edit-course/:id" element={<EditMyCourses/>} />
    </Routes>
  </Router>
  )
}

export default App;
