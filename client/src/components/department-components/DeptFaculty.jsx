import React from "react";
import StaffComponent from "../StaffComponent";
import {useParams} from "react-router-dom";
export default function DeptPortfolio(props) {
	const branch = useParams();
	console.log(props);
	return (
		<>
			<h2 className="heading-top-left-line">
				<span className="heading-red">Faculty</span> Profile
			</h2>
			<div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-12">
				{props.faculty.map(
					(i, index) =>
						i.branch === branch.branch && (
							<StaffComponent staffimages={i} key={index} />
						)
				)}
			</div>
			<hr className="my-5" />
			<h1 className="heading-top-center-line text-center my-4 supporting-heading">
				Supporting <span className="heading-red"> Staff</span>
			</h1>
			<div className="grid grid-cols-2 gap-12">
				{props.supportingStaff.map(
					(i, index) =>
						i.branch === branch.branch && (
							<StaffComponent staffimages={i} key={index} />
						)
				)}
			</div>
		</>
	);
}
