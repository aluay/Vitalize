import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
		console.log("setIsAuthenticated: ", isAuthenticated);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		console.log("setIsAuthenticated: ", isAuthenticated);
		navigate("/");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
