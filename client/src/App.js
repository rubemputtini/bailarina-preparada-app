import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

          <Route 
              path="/login" 
              element={
                  <ProtectedRoute publicRoute>
                      <LoginPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/signup" 
              element={
                  <ProtectedRoute publicRoute>
                      <SignupPage />
                  </ProtectedRoute>
              } 
          />
          <Route path="*" element={<Navigate to="/" />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
