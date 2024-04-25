import React, { useState } from "react";
import Header from "../../../components/Header";

function PortfolioDataForm() {
    const [session, setSession] = useState("");
    const [department, setDepartment] = useState("");
    const [pdfFile, setPdfFile] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form logic here
        const formData = new FormData();
        formData.append("session", session);
        formData.append("department", department);
        formData.append("pdfFile", pdfFile); // Assuming pdfFile is a File object

        // Make the fetch POST request
        fetch(
            "https://gpsakoli.ac.in/public/api/connection.php?action=insertDeptPortfolio",
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                // Handle success response
                alert("Success:", data);
                console.log("Success:", data);
                return true;
            })
            .catch((error) => {
                // Handle error
                alert("Error:", error);
                return false;
            });
    };

    return (
        <>
            <form className="max-w-md my-12 mx-auto confirm-admission" method="post">
                <h1 className="heading">Department Portfolio</h1>
                {/* Session dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="session">
                        Session
                    </label>
                    <select
                        className="border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        value={session}
                        onChange={(event) => setSession(event.target.value)}
                        name="session"
                    >

                        <option value="">Select Session</option>
                        <option value="2021-2022">2021-2022</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Department dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="department">
                        Department
                    </label>
                    <select
                        className="border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        name="department"
                    >
                        <option value="">Select Department</option>
                        <option value="computer">Computer Technology</option>
                        <option value="electrical">Electrical Engineering</option>
                        <option value="electronics">Electronics and Telecommunication</option>
                        <option value="mechanical">Mechanical Engineering</option>
                        <option value="civil">Civil Engineering</option>
                    </select>
                </div>
                {/* PDF Upload option */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="pdf-file">
                        Upload PDF
                    </label>
                    <input
                        required
                        className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        id="pdf-file"
                        name="pdfFile"
                        type="file"
                        accept=".pdf"
                        onChange={(event) => setPdfFile(event.target.files[0])}
                    />
                </div>
                {/* Submit button */}
                <div className="flex items-center justify-between flex-wrap">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full sm:w-auto mx-auto"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}

export default PortfolioDataForm;
