import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import UserManagement from "@/pages/UserManagement";
import AuditPage from "./pages/AuditPage";
import AccountOpeningStep1 from "./pages/AccountOpeningStep1";
import AccountOpeningStep2 from "./pages/AccountOpeningStep2";
import AccountOpeningStep3 from "./pages/AccountOpeningStep3";
import AccountOpeningStep from "./pages/AccountOpeningStep";
import PerformancePage from "./pages/PerformancePage";

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