import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function Protected({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  // TODO: This should validate the token
  return !!token;
}