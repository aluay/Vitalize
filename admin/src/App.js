import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import NewChallenge from "./pages/NewChallenge";
import EditChallenge from "./pages/EditChallenge";
import Routines from "./pages/Routines";
import NewRoutine from "./pages/NewRoutine";
import EditRoutine from "./pages/EditRoutine";
import Expeditions from "./pages/Expeditions";
import NewExpedition from "./pages/NewExpedition";
import EditExpedition from "./pages/EditExpedition";
import Incentives from "./pages/Incentives";
import NewIncentive from "./pages/NewIncentive";
import EditIncentive from "./pages/EditIncentive";
import Login from "./pages/Login";
import Clients from "./pages/Clients";
import Users from "./pages/Users";
import ClientInfo from "./pages/ClientInfo";
import UserInfo from "./pages/UserInfo";
import Messages from "./pages/Messages";
import NewMessage from "./pages/NewMessage";
import EditMessage from "./pages/EditMessage";
import Breadcrumbs from "./components/Breadcrumbs";

const PrivateRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Breadcrumbs />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="challenges"
						element={
							<PrivateRoute>
								<Challenges />
							</PrivateRoute>
						}
					/>
					<Route
						path="challenges/new"
						element={
							<PrivateRoute>
								<NewChallenge />
							</PrivateRoute>
						}
					/>
					<Route
						path="challenges/edit/:id"
						element={
							<PrivateRoute>
								<EditChallenge />
							</PrivateRoute>
						}
					/>
					<Route
						path="routines"
						element={
							<PrivateRoute>
								<Routines />
							</PrivateRoute>
						}
					/>
					<Route
						path="routines/new"
						element={
							<PrivateRoute>
								<NewRoutine />
							</PrivateRoute>
						}
					/>
					<Route
						path="routines/edit/:id"
						element={
							<PrivateRoute>
								<EditRoutine />
							</PrivateRoute>
						}
					/>
					<Route
						path="expeditions"
						element={
							<PrivateRoute>
								<Expeditions />
							</PrivateRoute>
						}
					/>
					<Route
						path="expeditions/new"
						element={
							<PrivateRoute>
								<NewExpedition />
							</PrivateRoute>
						}
					/>
					<Route
						path="expeditions/edit/:id"
						element={
							<PrivateRoute>
								<EditExpedition />
							</PrivateRoute>
						}
					/>
					<Route
						path="incentives"
						element={
							<PrivateRoute>
								<Incentives />
							</PrivateRoute>
						}
					/>
					<Route
						path="incentives/new"
						element={
							<PrivateRoute>
								<NewIncentive />
							</PrivateRoute>
						}
					/>
					<Route
						path="incentives/edit/:id"
						element={
							<PrivateRoute>
								<EditIncentive />
							</PrivateRoute>
						}
					/>
					<Route
						path="clients"
						element={
							<PrivateRoute>
								<Clients />
							</PrivateRoute>
						}
					/>
					<Route
						path="users"
						element={
							<PrivateRoute>
								<Users />
							</PrivateRoute>
						}
					/>
					<Route
						path="clientInfo"
						element={
							<PrivateRoute>
								<ClientInfo />
							</PrivateRoute>
						}
					/>
					<Route
						path="/users/edit/:userId"
						element={
							<PrivateRoute>
								<UserInfo />
							</PrivateRoute>
						}
					/>
					<Route
						path="/messages"
						element={
							<PrivateRoute>
								<Messages />
							</PrivateRoute>
						}
					/>
					<Route
						path="/messages/new"
						element={
							<PrivateRoute>
								<NewMessage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/messages/edit/:messageId"
						element={
							<PrivateRoute>
								<EditMessage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

export default App;
