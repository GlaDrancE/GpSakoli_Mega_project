import React, { useState } from "react";

function MonitoringReportForm() {
    const [session, setSession] = useState("");
    const [reportPdf, setReportPdf] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form logic here
        const formData = new FormData();
        formData.append("session", session);
        formData.append("reportPdf", reportPdf); // Assuming reportPdf is a File object

        // Make the fetch POST request
        fetch("https://gpsakoli.ac.in/public/api/connection.php?action=insertMonitoringReport", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                // Handle success response
                console.log("Success:", data);
                return true;
            })
            .catch((error) => {
                // Handle error
                console.error("Error:", error);
                return false;
            });
    };

    // Additional form logic (e.g., validation) can be added here

    return (
        <>
            <form className="max-w-md my-12 mx-auto confirm-admission" method="post">
                {/* Form Name */}
                <h1 className="heading">Monitoring Report</h1>
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
                        <option value="">Select a Session</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Upload Monitoring Report pdf */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="reportPdf">
                        Monitoring Report PDF
                    </label>
                    <input
                        required
                        className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        id="reportPdf"
                        name="reportPdf"
                        type="file"
                        accept=".pdf"
                        onInput={(event) => {
                            setReportPdf(event.target.files[0]);
                            console.log(event.target.files[0]);
                        }}
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

export default MonitoringReportForm;
