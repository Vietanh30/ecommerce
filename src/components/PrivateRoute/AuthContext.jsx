import React, { createContext, useContext, useState, useEffect } from "react";
import { getAccessTokenFromLS, getProfileFromLS } from "../../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm trạng thái đang tải

    useEffect(() => {
        const token = getAccessTokenFromLS(); 
        const userProfile = getProfileFromLS(); 

        if (token && userProfile) {
            setIsAuthenticated(true);    
            setRole(userProfile.role_id);
        } else {
            setIsAuthenticated(false);
            setRole(null);
        }
        setLoading(false); // Đặt trạng thái tải về false sau khi kiểm tra
    }, []); // Chỉ chạy một lần khi component mount

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};