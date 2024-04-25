import React, { useState } from "react";
import Header from "../../../components/Header";

function TimeTableForm() {
    const [session, setSession] = useState("");
    const [department, setDepartment] = useState("");
    const [oddSemTimeTable, setOddSemTimeTable] = useState();
    const [evenSemTimeTable, setEvenSemTimeTable] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form logic here
        const formData = new FormData();
        formData.append("session", session);
        formData.append("department", department);
        formData.append("oddSemTimeTable", oddSemTimeTable); // Assuming pdf is a File object
        formData.append("evenSemTimeTable", evenSemTimeTable); // Assuming pdf is a File object

        // Make the fetch POST request
        fetch(
            "https://gpsakoli.ac.in/public/api/connection.php?action=insertTimeTable",
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
            <form
                className="max-w-md my-12 mx-auto confirm-admission"
                method="post">
                <h1 className="heading">Time Table Form</h1>
                {/* Session field */}
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
                {/* Department field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 mb-2"
                        htmlFor="department">
                        Department
                    </label>
                    <select
                        className="border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        name="department">
                        <option value="">Select a Department</option>
                        <option value="computer">Computer Technology</option>
                        <option value="electrical">
                            Electrical Engineering
                        </option>
                        <option value="electronics">
                            Electroncis and Tele. Comm.
                        </option>
                        <option value="mechanical">
                            Mechanical Engineering
                        </option>
                        <option value="civil">Civil Engineering</option>
                    </select>
                </div>
                {/* Odd Sem Time Table Upload field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 mb-2"
                        htmlFor="oddSemTimeTable">
                        Odd Sem Time Table (PDF)
                    </label>
                    <input
                        required
                        className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        id="oddSemTimeTable"
                        name="oddSemTimeTable"
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => {
                            setOddSemTimeTable(event.target.files[0]);
                        }}
                    />
                </div>
                {/* Even Sem Time Table Upload field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 mb-2"
                        htmlFor="evenSemTimeTable">
                        Even Sem Time Table (PDF)
                    </label>
                    <input
                        required
                        className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
                        id="evenSemTimeTable"
                        name="evenSemTimeTable"
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => {
                            setEvenSemTimeTable(event.target.files[0]);
                        }}
                    />
                </div>
                {/* Submit button */}
                <div className="flex items-center justify-between flex-wrap">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full sm:w-auto mx-auto"
                        type="submit"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}

export default TimeTableForm;
