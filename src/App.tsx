import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import NewPasswordPage from "./pages/NewPasswordPage.tsx";
// import DashboardPage from "./pages/DashboardPage.tsx";
// import ManagementPage from "./pages/ManagementPage.tsx";
// import OnboardingPage from "./pages/OnboardingPage";
// import AuditPage from "./pages/AuditPage";
// import ApprovalPage from "./pages/ApprovalPage";

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
                                {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
                            </Routes>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;