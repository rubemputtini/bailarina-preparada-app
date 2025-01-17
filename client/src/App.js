import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EvaluationPage from './pages/EvaluationPage';
import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import SchedulePage from './pages/SchedulePage';
import TrainingPage from './pages/TrainingPage';
import CalendarPage from './pages/CalendarPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

          <Route 
              path="/signup" 
              element={
                  <ProtectedRoute publicRoute>
                      <SignupPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/login" 
              element={
                  <ProtectedRoute publicRoute>
                      <LoginPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/home" 
              element={
                  <ProtectedRoute>
                      <HomePage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/planejamento" 
              element={
                  <ProtectedRoute>
                      <SchedulePage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/avaliacao" 
              element={
                  <ProtectedRoute>
                      <EvaluationPage />
                  </ProtectedRoute>
              } 
          />
           <Route 
              path="/ranking" 
              element={
                  <ProtectedRoute>
                      <RankingPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/calendario" 
              element={
                  <ProtectedRoute>
                      <CalendarPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/treinos" 
              element={
                  <ProtectedRoute>
                      <TrainingPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/conta" 
              element={
                  <ProtectedRoute>
                      <AccountPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/admin" 
              element={
                  <ProtectedRoute>
                      <AdminPage />
                  </ProtectedRoute>
              } 
          />
          <Route
                    path="/admin/users/:userId"
                    element={
                        <ProtectedRoute>
                            <UserDetailsPage />
                        </ProtectedRoute>
                    }
                />
          <Route path="*" element={<Navigate to="/" />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
