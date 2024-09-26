import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, role, loading } = useAuth();

    // Nếu đang tải, trả về null hoặc một component loading
    if (loading) {
        return null; // Hoặc có thể là <LoadingSpinner />
    }

    // // Kiểm tra xác thực
    // if (!isAuthenticated && role == 2) {
    //     return <Navigate to="/login" />;
    // }

    // Kiểm tra vai trò
    if (requiredRole === 1 && role !== 1) {
        return <Navigate to="/login-admin" />;
    }

    // Nếu yêu cầu vai trò là 2 (người dùng) và không phải là người dùng thì cũng điều hướng
    if (requiredRole === 2 && role !== 2) {
        return <Navigate to="/login" />;
    }

    return children; // Trả về children nếu đủ quyền
};

export default PrivateRoute;