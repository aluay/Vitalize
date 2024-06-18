export default async function Logout(navigate) {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	// resetSelectedClient();
	navigate("/login");
}
