import React from "react";
import { CollapseDropdown } from "../Dropdown";
const pdf = "reports/AuditReports/Audit21-22.pdf";

export const AuditReports = () => {
	const auditReport = [
		{ name: "Audit Report 2021 - 2022", path: pdf },
		{ name: "Audit Report 2020 - 2021", path: pdf },
		{ name: "Audit Report 2019 - 2020", path: pdf },
	];
	return (
		<>
			<h1 className="sub-heading">Audit Reports</h1>
			{auditReport.map((ra) => (
				<CollapseDropdown data={ra} />
			))}
		</>
	);
};
