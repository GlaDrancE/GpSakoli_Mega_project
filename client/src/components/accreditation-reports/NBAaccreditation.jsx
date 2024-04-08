import React from "react";

export const NBAaccreditation = () => {
	let NBAbranches = [
		"Computer Technology",
		"Civil Engineering",
		"Mechanical Engineering",
		"Electrical Engineering",
	];
	return (
		<>
			<div className="square-card-container">
				{NBAbranches.map((branch) => (
					<div className="square-card-body">
						<div className="square-card">{branch}</div>
					</div>
				))}
			</div>
		</>
	);
};
