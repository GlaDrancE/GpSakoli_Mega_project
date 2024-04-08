import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const SideNav = () => {
	return (
		<div className="side-nav">
			<div className="logo flex">
				{/* Place your logo here */}
				<img src={logo} width={46} alt="Logo" className="mr-3" />
				<h1>GPSAKOLI ADMIN PANEL</h1>
			</div>
			<nav>
				{/* Add your navigation links here */}
				<Link to="https://www.gpsakoli.ac.in">Visit Site</Link>
				<h2>College Forms</h2>
				<Link to="/admin-login/audit-report">Audit Reports</Link>
				<Link to="/admin-login/commitees">Commitees</Link>
				<Link to="/admin-login/gps-in-news">Gps In News</Link>
				<Link to="/admin-login/monitoring-report">Monitoring Report</Link>
				<Link to="/admin-login/add-eoa">EOA (AICTE)</Link>
				<h2>Facutly Forms</h2>
				<Link to="/admin-login/manage-staff-data">Recorded Staff</Link>
				<Link to="/admin-login/manage-supporting-staff-data">Recorded Supporting Staff</Link>
				<Link to="/admin-login/add-staff">Staff Form</Link>
				<Link to="/admin-login/add-supporting-staff">Supporting Staff Form</Link>
				<h2>Department Forms</h2>
				<Link to="/admin-login/digital-library">Digital Library</Link>
				<Link to="/admin-login/result-analysis">Result Analysis</Link>
				<Link to="/admin-login/event-analysis">Event & Analysis</Link>
				<Link to="/admin-login/mous">MOUs</Link>
				<Link to="/admin-login/curriculum">Curriculum</Link>
				<Link to="/admin-login/time-table">Time Table</Link>
				<Link to="/admin-login/add-news-letters">News Letters</Link>
				<Link to="/admin-login/irg-add">Internal Revenue Generation (IRG)</Link>
				<Link to="/admin-login/student-list-form">Student List</Link>
				<Link to="/admin-login/add-dept-portfolio">Department Portfolio</Link>
				<h2>Admin Settings</h2>
				<Link to="/admin-login/add-admin">Add Admin</Link>
				<Link to="/admin-login/manage-admins">Manage Admins</Link>
			</nav>
		</div>
	);
};

export default SideNav;
