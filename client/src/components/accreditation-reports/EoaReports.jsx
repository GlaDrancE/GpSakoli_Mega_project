import React from "react";
import { CollapseDropdown } from "../Dropdown";
const pdf = "reports/EOA/EOA23-24.pdf";
export const EoaReports = () => {
	const eoa = [
		{ name: "EOA Report 2023 - 2024 ", path: pdf },
		{ name: "EOA Report 2022 - 2023", path: pdf },
		{ name: "EOA Report 2021 - 2022", path: pdf },
		{ name: "EOA Report 2020 - 2021", path: pdf },
		{ name: "EOA Report 2019 - 2020", path: pdf },
		{ name: "EOA Report 2018 - 2019", path: pdf },
	];
	return (
		<>
			<h1 className="sub-heading">EOA (AICTE) Reports</h1>
			{eoa.map((ra) => (
				<CollapseDropdown data={ra} />
			))}
		</>
	);
};
