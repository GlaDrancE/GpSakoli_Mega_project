import React, { useState, useEffect } from "react";

const StaffTable = ({ fetchstaffData, staffData, onEdit, onDelete }) => {
	useEffect(() => {
		fetchstaffData();
	}, [])
	return (
		<>
			{staffData && (
				<>
					<div className="overflow-x-auto w-full">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Image
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Designation
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Qualification
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Teaching Experience
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Contact
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Detailed Bio
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Branch
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Email
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{staffData.map((staff, index) => (
									<tr key={index}>
										<td className="px-2 py-1 whitespace-nowrap">
											<img
												src={
													`https://gpsakoli.ac.in/public/api/public/images/` +
													staff.image
												}
												alt={staff.name}
												className="h-25 m-auto w-25"
											/>
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.name}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.designation}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.qualification}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.teachingExperience} Years
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.contact}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.detailedBio}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.branch}
										</td>
										<td className="px-2 py-1 whitespace-nowrap">
											{staff.email}
										</td>

										<td className="px-2 py-1 whitespace-nowrap text-sm text-white-500">
											<button
												className="text-indigo-600 hover:text-indigo-900 mr-2"
												onClick={() => onEdit(staff.sno)}>
												Edit
											</button>
											<button
												className="text-red-600 hover:text-red-900"
												onClick={() => onDelete(staff.sno)}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</>
	);
};

export default StaffTable;
