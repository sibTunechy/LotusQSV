import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import NewPasswordPage from "./pages/NewPasswordPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import UserManagement from "@/pages/UserManagement";
import AuditPage from "./pages/AuditPage";
// import ManagementPage from "./pages/ManagementPage.tsx";
// import OnboardingPage from "./pages/OnboardingPage";
// import AuditPage from "./pages/AuditPage";
// import ApprovalPage from "./pages/ApprovalPage";
import AccountOpeningStep1 from "./pages/AccountOpeningStep1.tsx";
import AccountOpeningStep2 from "./pages/AccountOpeningStep2.tsx";
import AccountOpeningStep3 from "./pages/AccountOpeningStep3.tsx";
import AccountOpeningStep from "./pages/AccountOpeningStep.tsx";
import PerformancePage from "./pages/PerformancePage.tsx";

function App() {
    return (
        <Routes>
            {/* Login route without Navbar */}
            {/* All other routes with Navbar */}
            <Route
                path="/*"
                element={
                    <div className="min-h-screen bg-gray-100">
                        <div className="p-6">
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/newpassword" element={<NewPasswordPage/>} /> 
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/management" element={<UserManagement />} />
                                <Route path="/audit" element={<AuditPage />} />
                                <Route path="/account-opening/step-1" element={<AccountOpeningStep1 />} />
                                <Route path="/account-opening/review/:customerId" element={<AccountOpeningStep2 />} />
                                <Route path="/account-opening/step-3/:customerId" element={<AccountOpeningStep3 />} />
                                <Route path="/account-openingstep" element={<AccountOpeningStep/>} /> 
                                <Route path="/performance" element={<PerformancePage />} />
                            </Routes>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;