import { useAuth } from '../context/authContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();

    // Check if user data exists before rendering
    if (!user) return null;

    const { fullName, email, role } = user.user; // Matching backend response structure

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <span className="logo">QAT_Project</span>
                <div className="nav-right">
                    <span>{fullName} ({role})</span>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <main className="main-content">
                <h1>Welcome, {fullName}!</h1>
                <p>You are logged in as a <strong>{role}</strong></p>

                <div className="role-content">
                    {/* Role Based Views */}
                    {role === 'Admin' && (
                        <div className="admin-box">
                            <h3>Admin Control Panel</h3>
                            <p>You have full system access. You can manage users and view all system logs.</p>
                        </div>
                    )}

                    {role === 'Manager' && (
                        <div className="manager-box">
                            <h3>Management Dashboard</h3>
                            <p>You can oversee your team's progress and review project deadlines.</p>
                        </div>
                    )}

                    {role === 'User' && (
                        <div className="user-box">
                            <h3>Personal Workspace</h3>
                            <p>View your individual tasks and notifications here.</p>
                        </div>
                    )}

                    <div className="common-box">
                        <h3>Profile Details</h3>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Account ID:</strong> {user.user.id}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
