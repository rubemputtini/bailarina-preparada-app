export const ROUTES = {
    // Públicas
    home: "/",
    signup: "/signup",
    login: "/login",
    forgotPassword: "/esqueci-senha",
    resetPassword: "/redefinir-senha",
  
    // Usuário autenticado
    dashboard: "/dashboard",
    schedule: "/planejamento",
    training: "/treinos",
    calendar: "/calendario",
    ranking: "/ranking",
    account: "/conta",
    evaluationDetail: (id = ":evaluationId") => `/avaliacao/${id}`,
    evaluationHistoric: "/avaliacoes",
  
    // Rotas restritas a admin
    adminHome: "/admin",
    adminAnnouncements: "/admin/avisos",
    adminCreateEvaluation: "/admin/criar-avaliacao",
    adminEditUser: (userId = ":userId") => `/admin/users/${userId}`,
    adminUserSchedule: (userId = ":userId") => `/admin/planejamento/${userId}`,
    adminUserEvaluations: (userId = ":userId") => `/admin/avaliacoes/${userId}`,
    
    // Rota fallback
    fallback: "*"
  };
  