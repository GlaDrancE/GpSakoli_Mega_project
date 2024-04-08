import React, { useState } from "react";

function GPSNewsForm() {
  const [session, setSession] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsArticleImage, setNewsArticleImage] = useState();
  const [dateOfEvent, setDateOfEvent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form logic here
    const formData = new FormData();
    formData.append("session", session);
    formData.append("newsTitle", newsTitle);
    formData.append("newsArticleImage", newsArticleImage);
    formData.append("dateOfEvent", dateOfEvent);
    // Make the fetch POST request
    fetch("http://localhost:8012/api/connection.php?action=insertGPSNews", {
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

  return (
    <>
      <form
        className="max-w-md my-12 mx-auto confirm-admission"
        method="post"
      >
        <h1 className="heading">GPS News Form</h1>
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
        {/* News Title field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="newsTitle">
            News Title
          </label>
          <input
            required
            className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            id="newsTitle"
            name="newsTitle"
            type="text"
            placeholder="Enter news title"
            value={newsTitle}
            onChange={(event) => setNewsTitle(event.target.value)}
          />
        </div>
        {/* News Article Image Upload field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="newsArticleImage">
            News Article Image
          </label>
          <input
            required
            className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            id="newsArticleImage"
            name="newsArticleImage"
            type="file"
            accept="image/*"
            onInput={(event) => {
              setNewsArticleImage(event.target.files[0]);
              console.log(event.target.files[0]);
            }}
          />
        </div>
        {/* Date of Event field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dateOfEvent">
            Date of Event
          </label>
          <input
            required
            className="appearance-none border-2 border-slate-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            id="dateOfEvent"
            name="dateOfEvent"
            type="date"
            placeholder="Select date of event"
            value={dateOfEvent}
            onChange={(event) => setDateOfEvent(event.target.value)}
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

export default GPSNewsForm;
