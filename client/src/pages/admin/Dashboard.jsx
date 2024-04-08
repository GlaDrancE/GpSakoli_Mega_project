import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import DashboardTable from "../../components/DashboardTable";
import FacultyForm from "./Forms/FacultyForm";
import { useParams } from "react-router-dom";
import CurriculamForm from "./Forms/CurriculamForm";
import DigitalLibraryForm from "./Forms/DigitalLibForm"
import CommiteesForm from "./Forms/CommitteesForm"
import AuditReportForm from "./Forms/AuditReportForm"
import EventAnalysisForm from "./Forms/EventForm"
import GPSNewsForm from "./Forms/GPSNewsForm"
import IRGForm from "./Forms/IRGForm"
import MonitoringReportForm from "./Forms/MonitoringReportForm"
import NewsletterForm from "./Forms/NewsletterForm"
import Portfolio from "./Forms/PortfolioDataForm"
import StudentListForm from "./Forms/StudentListForm"
import MoUsForm from "./Forms/MoUsForm";
import TimeTableForm from "./Forms/TimeTableForm";
import ResultAnalysisForm from "./Forms/ResultAnalysisForm";
import FacultySupportingForm from "./Forms/FactultySupportingForm";
import EoaForm from "./Forms/EoaForm";


export const Dashboard = () => {
	const { page } = useParams();
	const [staffData, setStaffData] = useState();
	const fetchstaffData = async () => {
		let response = await fetch(
			"http://localhost:8012/api/connection.php?staff-details",
			{ method: "GET" }
		);

		let data = await response.json();
		setStaffData(data.data);
	};
	const onDelete = async (i) => {
		let response = await fetch(
			"http://localhost:8012/api/connection.php?action=deleteFacultyDetails&sno=" + i,
			{ method: "GET" }
		);

		let data = await response.text();
		fetchstaffData();
		console.log(data);
	};
	useEffect(() => {
		fetchstaffData();
	}, []);

	return (
		<>
			<div
				className="dashboard-container grid"
				style={{ gridTemplateColumns: "250px 100%" }}>
				<div>
					<Sidebar />
				</div>
				<div className="dashboard-content p-4">
					{page === "manage-staff-data" && (
						<DashboardTable
							fetchstaffData={fetchstaffData}
							staffData={staffData}
							onDelete={onDelete}
						/>
					)}
					{page === "add-staff" && <FacultyForm />}
					{page === "manage-supporting-staff-data" && <CurriculamForm />}
					{page === "add-supporting-staff" && <FacultySupportingForm />}
					{page === "digital-library" && <DigitalLibraryForm />}
					{page === "result-analysis" && <ResultAnalysisForm />}
					{page === "event-analysis" && <EventAnalysisForm />}
					{page === "mous" && <MoUsForm />}
					{page === "curriculum" && <CurriculamForm />}
					{page === "time-table" && <TimeTableForm />}
					{page === "commitees" && <CommiteesForm />}
					{page === "audit-report" && <AuditReportForm />}
					{page === "gps-in-news" && <GPSNewsForm />}
					{page === "irg-add" && <IRGForm />}
					{page === "monitoring-report" && <MonitoringReportForm />}
					{page === "add-news-letters" && <NewsletterForm />}
					{page === "add-dept-portfolio" && <Portfolio />}
					{page === "student-list-form" && <StudentListForm />}
					{page === "add-eoa" && <EoaForm />}
					{/* {page === "add-admin" && <AddAdminForm />} */}
					{/* {page === "manage-admins" && <ManageAdmin />} */}
				</div>
			</div>
		</>
	);
};
