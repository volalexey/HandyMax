import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { UserLayout } from './layouts/UserLayout';
import { PersonalInformation } from './pages/user/PersonalInformation';
import { OrdersPage } from './pages/user/OrdersPage';
import { OrderDetailsPage } from './pages/user/OrderDetailsPage';
import { CreateReviewPage } from './pages/user/CreateReviewPage';
import { RecommendationsPage } from './pages/user/RecomendationsPage';
import { RecommendationDetailsPage } from './pages/user/RecommendationDetailsPage';
import { AdminAuthLayout } from './layouts/AdminAuthLayout';
import { LogInPage } from './pages/admin/auth/LogInPage';
import { RecoverPasswordPage } from './pages/admin/auth/RecoverPasswordPage';
import { NewPasswordPage } from './pages/admin/auth/NewPasswordPage';
import { SuccessfulRecoveryPage } from './pages/admin/auth/SuccessfulRecoveryPage';
import { AdminLayout } from './layouts/AdminLayout';
import { StatisticsPage } from './pages/admin/StatisticsPage';
import { ServicesAdminPage } from './pages/admin/ServicesAdminPage';
import { AboutMasterAdminPage } from './pages/admin/AboutMasterAdminPage';
import { ReviewsAdminPage } from './pages/admin/ReviewsAdminPage';
import { ContactsAdminPage } from './pages/admin/ContactsAdminPage';
import { RecommendationsAdminPage } from './pages/admin/RecommendationsAdminPage';
import { EditRecommendationPage } from './pages/admin/EditRecommendationPage';
import { EditServicePage } from './pages/admin/EditServicePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>

        <Route path="/user-panel" element={<UserLayout />}>
            <Route index element={<Navigate to="personal-info" replace />} />
            
            <Route path="personal-info" element={<PersonalInformation />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="order-details" element={<OrderDetailsPage />} />
            <Route path="create-review" element={<CreateReviewPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="recommendation-details" element={<RecommendationDetailsPage />} />
        </Route>

        <Route path="/admin-auth" element={<AdminAuthLayout />}>
            <Route index element={<Navigate to="log-in" replace />} />
            
            <Route path="log-in" element={<LogInPage />} />
            <Route path="recover-password" element={<RecoverPasswordPage />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="successful-recovery" element={<SuccessfulRecoveryPage />} />
        </Route>

        <Route path="/admin-panel" element={<AdminLayout />}>
            <Route index element={<Navigate to="statistics" replace />} />
            
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="services" element={<ServicesAdminPage />} />
            <Route path="about" element={<AboutMasterAdminPage />} />
            <Route path="reviews" element={<ReviewsAdminPage />} />
            <Route path="contacts" element={<ContactsAdminPage />} />
            <Route path="recommendations" element={<RecommendationsAdminPage />} />

            <Route path="edit-recommendation/:id" element={<EditRecommendationPage />} />
            <Route path="edit-service/:id" element={<EditServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;