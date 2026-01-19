import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { UserLayout } from './layouts/UserLayout';
import { AdminAuthLayout } from './layouts/AdminAuthLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Guard
import { AuthGuard } from './hoc/AuthGuard';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';

// User Pages
import { PersonalInformation } from './pages/user/PersonalInformation';
import { OrdersPage } from './pages/user/OrdersPage';
import { OrderDetailsPage } from './pages/user/OrderDetailsPage';
import { CreateReviewPage } from './pages/user/CreateReviewPage';
import { RecommendationsPage } from './pages/user/RecomendationsPage';
import { RecommendationDetailsPage } from './pages/user/RecommendationDetailsPage';

// Admin Auth Pages
import { LogInPage } from './pages/admin/auth/LogInPage';
import { RecoverPasswordPage } from './pages/admin/auth/RecoverPasswordPage';
import { NewPasswordPage } from './pages/admin/auth/NewPasswordPage';
import { SuccessfulRecoveryPage } from './pages/admin/auth/SuccessfulRecoveryPage';

// Admin Panel Pages
import { StatisticsPage } from './pages/admin/StatisticsPage';
import { ServicesAdminPage } from './pages/admin/ServicesAdminPage';
import { AboutMasterAdminPage } from './pages/admin/AboutMasterAdminPage';
import { ReviewsAdminPage } from './pages/admin/ReviewsAdminPage';
import { ContactsAdminPage } from './pages/admin/ContactsAdminPage';
import { RecommendationsAdminPage } from './pages/admin/RecommendationsAdminPage';
import { EditRecommendationPage } from './pages/admin/EditRecommendationPage';
import { EditServicePage } from './pages/admin/EditServicePage';
import { AddServicePage } from './pages/admin/AddServicePage';
import { AddRecommendationPage } from './pages/admin/AddRecommendationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC SITE --- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>

        {/* --- USER PANEL --- */}
        <Route path="/user-panel" element={<UserLayout />}>
            <Route index element={<Navigate to="personal-info" replace />} />
            <Route path="personal-info" element={<PersonalInformation />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="create-review" element={<CreateReviewPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="recommendations/:id" element={<RecommendationDetailsPage />} />
        </Route>

        {/* --- ADMIN AUTH (Login, Recovery) --- */}
        <Route path="/admin-auth" element={<AdminAuthLayout />}>
            <Route index element={<Navigate to="log-in" replace />} />
            <Route path="log-in" element={<LogInPage />} />
            <Route path="recover-password" element={<RecoverPasswordPage />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="successful-recovery" element={<SuccessfulRecoveryPage />} />
        </Route>
        
        {/* --- PROTECTED ADMIN PANEL --- */}
        {/* Оборачиваем всё в AuthGuard. Он проверит токен перед рендером вложенных роутов */}
        <Route element={<AuthGuard />}>
            <Route path="/admin-panel" element={<AdminLayout />}>
                <Route index element={<Navigate to="statistics" replace />} />
                
                <Route path="statistics" element={<StatisticsPage />} />
                
                {/* Services */}
                <Route path="services" element={<ServicesAdminPage />} />
                <Route path="add-service" element={<AddServicePage />} />
                <Route path="edit-service/:id" element={<EditServicePage />} />

                {/* Profile */}
                <Route path="about" element={<AboutMasterAdminPage />} />
                <Route path="contacts" element={<ContactsAdminPage />} />
                
                {/* Reviews */}
                <Route path="reviews" element={<ReviewsAdminPage />} />
                
                {/* Recommendations */}
                <Route path="recommendations" element={<RecommendationsAdminPage />} />
                <Route path='add-recommendation' element={<AddRecommendationPage />} />
                <Route path="edit-recommendation/:id" element={<EditRecommendationPage />} />
            </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;