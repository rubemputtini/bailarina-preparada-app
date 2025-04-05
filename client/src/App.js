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
import { ROUTES } from 'shared/routes/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.signup} replace />} />

        <Route 
          path={ROUTES.signup}
          element={
            <ProtectedRoute publicRoute>
              <SignupPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.login}
          element={
            <ProtectedRoute publicRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.schedule}
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.evaluationDetail()}
          element={
            <ProtectedRoute>
              <EvaluationDetailPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.evaluationHistoric}
          element={
            <ProtectedRoute>
              <EvaluationHistoricPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.ranking}
          element={
            <ProtectedRoute>
              <RankingPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.calendar}
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.training}
          element={
            <ProtectedRoute>
              <TrainingPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.account}
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path={ROUTES.adminHome}
          element={
            <ProtectedRoute requireAdmin>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.adminAnnouncements}
          element={
            <ProtectedRoute requireAdmin>
              <AnnouncementAdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.adminCreateEvaluation}
          element={
            <ProtectedRoute requireAdmin>
              <EvaluationAdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.adminUserSchedule()}
          element={
            <ProtectedRoute requireAdmin>
              <ScheduleAdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.adminUserEvaluations()}
          element={
            <ProtectedRoute requireAdmin>
              <EvaluationHistoricPage />
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.fallback} element={<Navigate to={ROUTES.home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;