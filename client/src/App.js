import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './features/auth/ProtectedRoute';
import SignupPage from './features/auth/signup/pages/SignupPage';
import LoginPage from './features/auth/login/pages/LoginPage';
import EvaluationAdminPage from './features/evaluation/pages/EvaluationAdminPage';
import Dashboard from './features/dashboard/pages/Dashboard';
import RankingPage from './features/ranking/pages/RankingPage';
import SchedulePage from './features/schedule/pages/SchedulePage';
import TrainingPage from './features/training/pages/TrainingPage';
import CalendarPage from './features/calendar/pages/CalendarPage';
import AccountPage from './features/account/pages/AccountPage';
import AdminPage from './features/admin/pages/AdminPage';
import EvaluationDetailPage from './features/evaluation/pages/EvaluationDetailPage';
import EvaluationHistoricPage from './features/evaluation/pages/EvaluationHistoricPage';
import ScheduleAdminPage from './features/schedule/pages/ScheduleAdminPage';
import AnnouncementAdminPage from './features/announcement/pages/AnnouncementAdminPage';

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
              path="/dashboard" 
              element={
                  <ProtectedRoute>
                      <Dashboard />
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
              path="/criar-avaliacao" 
              element={
                  <ProtectedRoute>
                      <EvaluationAdminPage />
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/avaliacao/:evaluationId" 
              element={
                  <ProtectedRoute>
                      <EvaluationDetailPage /> 
                  </ProtectedRoute>
              } 
          />
          <Route 
              path="/avaliacoes" 
              element={
                  <ProtectedRoute>
                      <EvaluationHistoricPage />
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
              path="/avisos"
              element={
                   <ProtectedRoute>
                       <AnnouncementAdminPage />
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
              path="/admin/planejamento/:userId" 
              element={
                  <ProtectedRoute requireAdmin>
                      <ScheduleAdminPage />
                  </ProtectedRoute>
              } 
          />
          <Route
              path="/admin/avaliacoes/:userId"
              element={
                  <ProtectedRoute requireAdmin>
                      <EvaluationHistoricPage />
                  </ProtectedRoute>
              }
          />
          <Route path="*" element={<Navigate to="/" />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
