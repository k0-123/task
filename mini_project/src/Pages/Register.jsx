import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User'
    });
    const [errorMsg, setErrorMsg] = useState('');
    const { registerAccount } = useAuth(); // Assuming we named it this in AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(''); // Reset error

        if (formData.password !== formData.confirmPassword) {
            return setErrorMsg('Passwords do not match found!');
        }
        
        try {
            // Note: We use the exact field names the backend expects
            await registerAccount({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            navigate('/dashboard');
        } catch (err) {
            setErrorMsg(err.response?.data?.msg || 'Registration failed. Check your details.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                {errorMsg && <p className="error-text">{errorMsg}</p>}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                    
                    <div style={{margin: '10px 0'}}>
                        <label>Select Your Role: </label>
                        <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                            <option value="User">User</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
