import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<Breadcrumb fontWeight="medium" fontSize="sm">
			{pathnames.map((value, index) => {
				const to = `/${pathnames.slice(0, index + 1).join("/")}`;
				return (
					<BreadcrumbItem key={to}>
						<BreadcrumbLink as={Link} to={to}>
							{value.charAt(0).toUpperCase() + value.slice(1)}
						</BreadcrumbLink>
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
};

export default Breadcrumbs;
