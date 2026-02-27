 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';

 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

         
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h1>404</h1><p>Page Not Found</p></div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
