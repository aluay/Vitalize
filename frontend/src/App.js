import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthenticatedNavBar from "./components/AuthenticatedNavBar";
import HomePageNavbar from "./components/HomePageNavBar";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailsPage from "./pages/ChallengeDetailsPage";
import RoutinesPage from "./pages/RoutinesPage";
import RoutineDetailsPage from "./pages/RoutineDetailsPage";
import ExpeditionsPage from "./pages/ExpeditionsPage";
import ExpeditionDetailsPage from "./pages/ExpeditionDetailsPage";
import AchievementsPage from "./pages/AchievementsPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<Box>
					<ConditionalNavBar />
					<Routes>
						<Route
							path="/"
							element={
								<RedirectIfAuthenticated>
									<HomePage />
								</RedirectIfAuthenticated>
							}
						/>
						<Route
							path="/login"
							element={
								<RedirectIfAuthenticated>
									<LoginPage />
								</RedirectIfAuthenticated>
							}
						/>
						<Route
							path="/register"
							element={
								<RedirectIfAuthenticated>
									<RegisterPage />
								</RedirectIfAuthenticated>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<DashboardPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<PrivateRoute>
									<ProfilePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/challenges"
							element={
								<PrivateRoute>
									<ChallengesPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/challenges/:id"
							element={
								<PrivateRoute>
									<ChallengeDetailsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/routines"
							element={
								<PrivateRoute>
									<RoutinesPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/routines/:id"
							element={
								<PrivateRoute>
									<RoutineDetailsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/expeditions"
							element={
								<PrivateRoute>
									<ExpeditionsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/expeditions/:id"
							element={
								<PrivateRoute>
									<ExpeditionDetailsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/achievements"
							element={
								<PrivateRoute>
									<AchievementsPage />
								</PrivateRoute>
							}
						/>
						{/* <Route path="*" element={<Navigate to="/login" />} /> */}
					</Routes>
				</Box>
			</AuthProvider>
		</Router>
	);
};

const ConditionalNavBar = () => {
	const { isAuthenticated, loading } = useAuth();
	if (loading) return null; // Don't render anything until loading is done
	return isAuthenticated ? <AuthenticatedNavBar /> : <HomePageNavbar />;
};

export default App;
