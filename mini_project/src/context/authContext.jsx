import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const localUser = localStorage.getItem('profile');
        if (localUser) {
            try {
                const parsed = JSON.parse(localUser);
                setUser(parsed);

                axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
            } catch (err) {
                console.error('CheckAuth: Failed to parse stored user', err);
                localStorage.removeItem('profile');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('profile', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const registerAccount = async (payload) => {
        const { data } = await axios.post('/api/auth/register', payload);
        setUser(data);
        localStorage.setItem('profile', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('profile');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, registerAccount, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
