<?php
require_once 'vendor/autoload.php'; // Include Composer's autoloader

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Should match * or the origin of your frontend application
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Create a new MySQLi connection
$connection = new mysqli($_ENV['MYSQL_HOST'], $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD'], $_ENV['MYSQL_DATABASE']);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Endpoint to retrieve lab data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['labs'])) {
    $result = $connection->query("SELECT * FROM labs where branch='" . $_GET['labs'] . "'");
    $labs = [];
    while ($row = $result->fetch_assoc()) {
        $labs[] = $row;
    }
    echo json_encode(['data' => $labs]);
}

// Endpoint to retrieve curriculum data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['curriculum'])) {
    $result = $connection->query("SELECT * FROM curriculum where branch='" . $_GET['curriculum'] . "'");
    $curriculum = [];
    while ($row = $result->fetch_assoc()) {
        $curriculum[] = $row;
    }
    echo json_encode(['data' => $curriculum]);
}
// Endpoint to retrieve IRG data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['irg'])) {
    $result = $connection->query("SELECT * FROM irg where department='" . $_GET['irg'] . "'");
    $irg = [];
    while ($row = $result->fetch_assoc()) {
        $irg[] = $row;
    }
    echo json_encode(['data' => $irg]);
}

// Endpoint to retrieve TimeTable data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['timeTable'])) {
    $result = $connection->query("SELECT * FROM time_table where department='" . $_GET['timeTable'] . "'");
    $timeTable = [];
    while ($row = $result->fetch_assoc()) {
        $timeTable[] = $row;
    }
    echo json_encode(['data' => $timeTable]);
}

// Endpoint to retrieve Result data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['resultAnalysis'])) {
    $result = $connection->query("SELECT * FROM result_analysis where department='" . $_GET['resultAnalysis'] . "'");
    $resultAnalysis = [];
    while ($row = $result->fetch_assoc()) {
        $resultAnalysis[] = $row;
    }
    echo json_encode(['data' => $resultAnalysis]);
}

// Endpoint to retrieve Event Analysis data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['eventAnalysis'])) {
    $result = $connection->query("SELECT * FROM event_analysis where department='" . $_GET['eventAnalysis'] . "'");
    $eventAnalysis = [];
    while ($row = $result->fetch_assoc()) {
        $eventAnalysis[] = $row;
    }
    echo json_encode(['data' => $eventAnalysis]);
}

// Endpoint to retrieve staff details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['staff-details'])) {
    $result = $connection->query("SELECT * FROM staff");
    $staffDetails = [];
    while ($row = $result->fetch_assoc()) {
        $staffDetails[] = $row;
    }
    echo json_encode(['data' => $staffDetails]);
}

// Endpoint to retrieve supporting staff details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['supporting-staff-details'])) {
    $result = $connection->query("SELECT * FROM supporting_staff");
    $supportingStaffDetails = [];
    while ($row = $result->fetch_assoc()) {
        $supportingStaffDetails[] = $row;
    }
    echo json_encode(['data' => $supportingStaffDetails]);
}

// Endpoint to retrieve department portfolio data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['dept-portfolio'])) {
    $result = $connection->query("SELECT * FROM dept_portfolio where branch='" . $_GET['dept-portfolio'] . "'");
    $deptPortfolio = [];
    while ($row = $result->fetch_assoc()) {
        $deptPortfolio[] = $row;
    }
    echo json_encode(['data' => $deptPortfolio]);
}

// Endpoint to retrieve Audit Report data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['auditReport'])) {
    $result = $connection->query("SELECT * FROM audit_reports");
    $auditReport = [];
    while ($row = $result->fetch_assoc()) {
        $auditReport[] = $row;
    }
    echo json_encode(['data' => $auditReport]);
}

// Endpoint to retrieve Digital Library data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['digital-library'])) {
    $result = $connection->query("SELECT * FROM digital_library");
    $deptPortfolio = [];
    while ($row = $result->fetch_assoc()) {
        $deptPortfolio[] = $row;
    }
    echo json_encode(['data' => $deptPortfolio]);
}




// Endpoint to retrieve GPS News data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['gps-newses'])) {
    $result = $connection->query("SELECT * FROM news_articles");
    $deptPortfolio = [];
    while ($row = $result->fetch_assoc()) {
        $deptPortfolio[] = $row;
    }
    echo json_encode(['data' => $deptPortfolio]);
}




// Endpoint to Insert Alumni Registration data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertAlumniDetails') {
    $alumniData = json_decode(file_get_contents('php://input'), true);
    print_r($alumniData);
    $name = $alumniData['name'];
    $email = $alumniData['email'];
    $phone = $alumniData['phone'];
    $yearOfPassing = $alumniData['yearOfPassing'];
    $dateOfBirth = $alumniData['dateOfBirth'];
    $occupation = $alumniData['occupation'];
    $address = $alumniData['address'];
    $afterDiploma = $alumniData['afterDiploma'];
    $gender = $alumniData['gender'];
    // Add other staff details here...
    $stmt = $connection->prepare("INSERT INTO alumni_registration (name, email, phone, yearOfPassing, dateOfBirth, occupation, address, afterDiploma, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $name, $email, $phone, $yearOfPassing, $dateOfBirth, $occupation, $address, $afterDiploma, $gender);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Alumni data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store alumni data']);
    }
}


// Endpoint to insert student confirmation data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertStudentAdmissionDetails') {
    // $_POST = json_decode(file_get_contents('php://input'), true);
    print_r($_POST);
    $enrollment = $_POST['enrollment'];
    $aadharNo = $_POST['aadharNo'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $admissionYear = $_POST['admissionYear'];
    $directSecondYear = $_POST['directSecondYear'];
    $gender = $_POST['gender'];
    // Add other staff details here...
    $stmt = $connection->prepare("INSERT INTO students_admission_confirmation (enrollment, aadharNo, name, email, phone, gender, admissionYear, directSecondYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $enrollment, $aadharNo, $name, $email, $phone, $gender, $admissionYear, $directSecondYear);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Student Admission data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store student admission data']);
    }
}

//Saving faculty data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertFacultyDetails') {
    // print_r($_POST);
    $targetDir = "/api/assets/images/staff-imgs/"; // Specify the directory where you want to save the image
    $uploadOk = 1;
    $imagePath = "";
    // Extracting the staff form data
    $name = $_POST['name'];
    $designation = $_POST['designation'];
    $qualification = $_POST['qualification'];
    $teachingExperience = $_POST['teachingExperience'];
    $contactNumber = $_POST['phone'];
    $department = $_POST['department'];
    $email = $_POST['email'];

    // Check if image file is an actual image or fake image
    if (isset($_FILES["staffImg"]["tmp_name"])) {
        $check = getimagesize($_FILES["staffImg"]["tmp_name"]);
        if ($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check if file already exists
    $targetFile = $_SERVER['DOCUMENT_ROOT'] . $targetDir . $department . '/' . basename($_FILES["staffImg"]["name"]);
    if (file_exists($targetFile)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size (for example, limit to 8MB)
    if ($_FILES["staffImg"]["size"] > 8000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // If everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["staffImg"]["tmp_name"], $targetFile)) {
            echo "The file " . htmlspecialchars(basename($_FILES["staffImg"]["name"])) . " has been uploaded.";
            $imagePath = 'staff-imgs/' . $department . "/" . basename($_FILES["staffImg"]["name"]);
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }


    if ($imagePath == "") {
        $imagePath = "staff-imgs/others/unavailable-faculty.jpg";
    }
    // Prepare the SQL statement
    $stmt = $connection->prepare("INSERT INTO staff (name, designation, qualification, teachingExperience, contact, branch, email, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $name, $designation, $qualification, $teachingExperience, $contactNumber, $department, $email, $imagePath);

    // Execute the statement and respond accordingly
    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
    }
}

//Saving Supporting faculty data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertSupportingFacultyDetails') {
    // print_r($_POST);
    $targetDir = "/api/assets/images/supporting-staff-imgs/"; // Specify the directory where you want to save the image
    $imagePath = ""; // Extracting the supporting staff form data
    $name = $_POST['name'];
    $designation = $_POST['designation'];
    $qualification = $_POST['qualification'];
    $teachingExperience = $_POST['experience'];
    $contactNumber = $_POST['phone'];
    $department = $_POST['department'];
    $email = $_POST['email'];

    $imagePath = storeFile($targetDir . $department . '/', "supporting-staffImg");
    if ($imagePath == "") {
        $imagePath = "staff-imgs/others/unavailable-faculty.jpg";
    }
    // Prepare the SQL statement
    $stmt = $connection->prepare("INSERT INTO supporting-staff (name, designation, qualification, teachingExperience, contact, branch, email, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $name, $designation, $qualification, $teachingExperience, $contactNumber, $department, $email, $imagePath);

    // Execute the statement and respond accordingly
    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
    }
}


//Saving GPS News data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertGPSNews') {
    // print_r($_POST);
    $targetDir = "/api/assets/images/gps-news/"; // Specify the directory where you want to save the image
    $imagePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $newsTitle = $_POST['newsTitle'];
    $dateOfEvent = $_POST['dateOfEvent'];

    $imagePath = storeFile($targetDir, "newsArticleImage");
    if ($imagePath == "") {
        $imagePath = "others/No-Image.png";
    }
    // Prepare the SQL statement
    $stmt = $connection->prepare("INSERT INTO news_articles (session, news_title, news_article_image, date_of_event) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $session, $newsTitle, $imagePath, $dateOfEvent);

    // Execute the statement and respond accordingly
    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
    }
}

//Saving Time Table data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertTimeTable') {
    // print_r($_POST);
    $targetDir = "/api/assets/TimeTable_PDFs/"; // Specify the directory where you want to save the image
    $FilePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];

    $EvenSem = 'Even: ' . $session;
    $OddSem = 'Odd: ' . $session;

    $oddSemFilePath = storeFile($targetDir . $department . '/', "oddSemTimeTable");
    $evenSemFilePath = storeFile($targetDir . $department . '/', "evenSemTimeTable");
    if ($oddSemFilePath != "" && $evenSemFilePath != "") {

        $sessionValues = array($EvenSem, $OddSem);
        $pathValues = array($evenSemFilePath, $oddSemFilePath);

        // Bind parameters
        // Prepare the SQL statement
        $stmt1 = $connection->prepare("INSERT INTO time_table (session, department, path)
        VALUES (?, ?, ?)");
        $stmt2 = $connection->prepare("INSERT INTO time_table (session, department, path)
        VALUES (?, ?, ?)");
        $stmt1->bind_param("sss", $EvenSem, $department, $evenSemFilePath);
        $stmt2->bind_param("sss", $OddSem, $department, $oddSemFilePath);

        // Execute the statement and respond accordingly
        if ($stmt1->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
        // Execute the statement and respond accordingly
        if ($stmt2->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }

}

//Saving Student List Form data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertStudentList') {
    // print_r($_POST);
    $targetDir = "/api/assets/StudentList_PDFs/"; // Specify the directory where you want to save the image
    $FilePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];
    $semester = $_POST['semester'];

    $FilePath = storeFile($targetDir . $department . '/', "studentList");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO students_list (session, department, semester, path) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $session, $department, $semester, $FilePath);
        // Execute the statement and respond accordingly
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }

}

//Saving News Letters data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertNewsletter') {
    // print_r($_POST);
    $targetDir = "/api/assets/NewsLetters_PDFs/"; // Specify the directory where you want to save the image
    $FilePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];

    $FilePath = storeFile($targetDir . $department . '/', "newsletterPdf");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO news_letters (session, department, path) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $session, $department, $FilePath);

        // Execute the statement and respond accordingly
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }

}

//Saving MOUs data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertMoUsDetails') {
    // print_r($_POST);
    $targetDir = "/api/assets/MOUs_PDFs/"; // Specify the directory where you want to save the image
    $FilePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];
    $firmName = $_POST['firmName'];
    $validUpto = $_POST['validUpto'];

    $FilePath = storeFile($targetDir . $department . '/', "pdfFile");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO MOUs (session, department, firm_name, valid_upto, path) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $session, $department, $firmName, $validUpto, $FilePath);
        // Execute the statement and respond accordingly
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }

}

//Saving IRG data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertIRG') {
    // print_r($_POST);
    $targetDir = "/api/assets/IRG_PDFs/"; // Specify the directory where you want to save the image
    $FilePath = ""; // Extracting the supporting staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];

    $FilePath = storeFile($targetDir . $department . '/', "irgPdf");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO irg (session, department, path) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $session, $department, $FilePath);
        // Execute the statement and respond accordingly
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }
}


// Saving Monitoring Report data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertMonitoringReport') {
    $targetDir = "/api/assets/MonitoringReports_PDFs/"; // Specify the directory where you want to save the image
    $uploadOk = 1;
    $FilePath = "";
    // Extracting the staff form data
    $session = $_POST['session'];
    $FilePath = storeFile($targetDir, "reportPdf");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO monitoring_reports (session, path) VALUES (?, ?)");
        $stmt->bind_param("ss", $session, $FilePath);
        // Execute the statement and respond accordingly.

        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Data Not Stored']);
        }
    }

}


// Saving Audit Report data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertAuditReport') {

    $targetDir = "/api/assets/Audit_PDFs/"; // Specify the directory where you want to save the image
    $uploadOk = 1;
    $FilePath = "";
    // Extracting the staff form data
    $session = $_POST['session'];

    // Check if file already exists
    $targetFile = $_SERVER['DOCUMENT_ROOT'] . $targetDir . basename($_FILES["auditReportPdf"]["name"]);
    if (file_exists($targetFile)) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, file already exists.']);
        $uploadOk = 0;
    }

    // Check file size (for example, limit to 8MB)
    if ($_FILES["auditReportPdf"]["size"] > 100000000) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, your file is too large.']);
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["auditReportPdf"]["tmp_name"], $targetFile)) {
            echo "The file " . htmlspecialchars(basename($_FILES["auditReportPdf"]["name"])) . " has been uploaded.";
            $FilePath = 'Audit_PDFs/' . basename($_FILES["auditReportPdf"]["name"]);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Sorry, there was an error uploading your file.";']);
        }
    }
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO audit_reports (session, path) VALUES (?, ?)");
        $stmt->bind_param("ss", $session, $FilePath);
        // Execute the statement and respond accordingly.
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Data Not Stored']);
        }
    }

}

// Saving Curriculum data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertCurriculamDetails') {

    $targetDir = "/api/assets/Curriculum_PDFs/"; // Specify the directory where you want to save the image
    $uploadOk = 1;
    $FilePath = "";
    // Extracting the staff form data
    $branch = $_POST['department'];
    $sem = $_POST['semester'];

    // Check if file already exists
    $targetFile = $_SERVER['DOCUMENT_ROOT'] . $targetDir . basename($_FILES["syllabusPdf"]["name"]);
    if (file_exists($targetFile)) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, file already exists.']);
        $uploadOk = 0;
    }

    // Check file size (for example, limit to 8MB)
    if ($_FILES["syllabusPdf"]["size"] > 100000000) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, your file is too large.']);
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["syllabusPdf"]["tmp_name"], $targetFile)) {
            echo "The file " . htmlspecialchars(basename($_FILES["syllabusPdf"]["name"])) . " has been uploaded.";
            $FilePath = 'Curriculum_PDFs/' . basename($_FILES["syllabusPdf"]["name"]);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Sorry, there was an error uploading your file.";']);
        }
    }

    if ($FilePath == "") {
        $FilePath = "pdf/unavailable.pdf";
    }
    // Prepare the SQL statement
    $stmt = $connection->prepare("INSERT INTO curriculum (branch, name, path) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $branch, $sem, $FilePath);

    // Execute the statement and respond accordingly.

    try {

        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        }
    } catch (Exception $e) {

    }
}



// Saving Digital Library data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertDigitalLib') {

    // Extracting the staff form data
    $subjectName = $_POST['subjectName'];
    $department = $_POST['department'];
    $title = $_POST['title'];
    $authorName = $_POST['authorName'];

    $PdfFilePath = storeFile("/api/assets/DigitalLib_PDFs/$department/", "bookPdf");
    $ImageFilePath = storeFile("/api/assets/images/book-cover-images/$department/", "coverImage");
    if ($PdfFilePath != "" && $ImageFilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO digital_library (subjectName, title, branch, authorName, coverImage, path) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $subjectName, $title, $department, $authorName, $ImageFilePath, $PdfFilePath);

        // Execute the statement and respond accordingly.
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Data Not stored']);
        }
    }
}


// Saving Department Portfolio data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertEoaForm') {

    // Extracting the staff form data
    $session = $_POST['session'];


    $FilePath = storeFile("/api/assets/EOA_PDFs/", "pdfFile");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO eoa (session, path) VALUES (?, ?)");
        $stmt->bind_param("ss", $session, $FilePath);

        // Execute the statement and respond accordingly.
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Data Not stored']);
        }
    }
}


// Saving Department Portfolio data 
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertDeptPortfolio') {

    // Extracting the staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];


    $FilePath = storeFile("/api/assets/DeptPortfolio_PDFs/" . $department . '/', "pdfFile");
    if ($FilePath != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO dept_portfolio (name, branch, path) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $session, $department, $FilePath);

        // Execute the statement and respond accordingly.
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Data Not stored']);
        }
    }
}


// Saving Event and analysis data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertEventDetails') {



    // Extracting the staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];
    $eventName = $_POST['eventName'];
    $dateOfEvent = $_POST['dateOfEvent'];
    $activityDescription = $_POST['activityDescription'];

    $FilePath = storeFile("/api/assets/images/event-imgs/", "eventImage");

    if ($FilePath == "") {
        $FilePath = "staff-imgs/others/unavailable-faculty.jpg";
    }

    // Prepare the SQL statement
    $stmt = $connection->prepare("INSERT INTO event_analysis (session, department, eventName, dateOfEvent, activityDescription, path) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $session, $department, $eventName, $dateOfEvent, $activityDescriptionm, $FilePath);

    // Execute the statement and respond accordingly.

    try {

        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'Data stored successfully']);
        }
    } catch (Exception $e) {

    }
}


// Saving Result analysis data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertResultAnalysisDetails') {



    // Extracting the staff form data
    $session = $_POST['session'];
    $department = $_POST['department'];

    $oddSemResult = storeFile("/api/assets/ResultAnalysis_PDFs/" . $department . '/', "oddSemResult");
    $evenSemResult = storeFile("/api/assets/ResultAnalysis_PDFs/" . $department . '/', "evenSemResult");

    if ($oddSemResult != "" && $evenSemResult != "") {
        // Prepare the SQL statement
        $stmt = $connection->prepare("INSERT INTO result_analysis (session, department, o_path, e_path) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $session, $department, $oddSemResult, $evenSemResult);
        // Execute the statement and respond accordingly
        if ($stmt->execute()) {
            echo json_encode(['status' => 200, 'message' => 'staff data stored successfully']);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Failed to store staff data']);
        }
    }
}



// Saving Commitee members data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'insertCommittee') {



    // Extracting the staff form data
    $session = $_POST['session'];
    $committeeName = $_POST['committeeName'];
    $chairmanName = $_POST['chairmanName'];
    $chairmanMobNo = $_POST['chairmanMobNo'];
    $memberNames = $_POST['memberNames'];
    $memberNumber = $_POST['memberNumber'];
    // print_r($memberNames);
    echo count($memberNames);
    // Prepare the SQL statements
    $stmt1 = $connection->prepare("INSERT INTO sessions (session_name) VALUES (?)");
    $stmt2 = $connection->prepare("INSERT INTO committees (committee_name, session_id) VALUES (?, ?)");
    $stmt3 = $connection->prepare("INSERT INTO members (member_name, member_number, committee_id, is_chairman) VALUES (?, ?, ?, 1)");
    $stmt4 = $connection->prepare("INSERT INTO members (member_name, member_number, committee_id, is_chairman) VALUES (?, ?, ?, 0)");
    $stmt1->bind_param("s", $session);
    $stmt1->bind_param("s", $session);
    if ($stmt1->execute()) {
        $session_id = $stmt1->insert_id;

        $stmt2->bind_param("si", $committeeName, $session_id);
        if ($stmt2->execute()) {
            $committee_id = $stmt2->insert_id;

            $stmt3->bind_param("ssi", $chairmanName, $chairmanMobNo, $committee_id);

            if ($stmt3->execute()) {
                for ($i = 0; $i < count($memberNumber); $i++) {
                    $membrName = $memberNames[$i];
                    $membrNumber = $memberNumber[$i];
                    $stmt4->bind_param("ssi", $membrName, $membrNumber, $committee_id);
                    if (!$stmt4->execute()) {
                        $response['status'] = 500;
                        $response['message'] = "Error inserting member data: " . $stmt4->error;
                        break; // Exit loop if an error occurs
                    }
                }
                if (!isset($response['status'])) {
                    $response['status'] = 200;
                    $response['message'] = "Data inserted successfully.";
                }
            } else {
                $response['status'] = 500;
                $response['message'] = "Error inserting chairman data: " . $stmt3->error;
            }
        } else {
            $response['status'] = 500;
            $response['message'] = "Error inserting committee data: " . $stmt2->error;
        }
    } else {
        $response['status'] = 500;
        $response['message'] = "Error inserting session data: " . $stmt1->error;
    }

    // // Return the response as JSON
    // http_response_code($response['status']);
    // header('Content-Type: application/json');
    echo json_encode($response);
}



function storeFile($targetDir, $file)
{
    $uploadOk = 1;
    $FilePath = "";

    // Check if file already exists
    $targetFile = $_SERVER['DOCUMENT_ROOT'] . $targetDir . basename($_FILES["$file"]["name"]);
    if (file_exists($targetFile)) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, file already exists.']);
        $uploadOk = 0;
        // return;
    }

    // Check file size (for example, limit to 8MB)
    if ($_FILES["$file"]["size"] > 100000000) {
        echo json_encode(['status' => 415, 'message' => 'Sorry, your file is too large.']);
        $uploadOk = 0;
        // return;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["$file"]["tmp_name"], $targetFile)) {
            echo "The file " . htmlspecialchars(basename($_FILES["$file"]["name"])) . " has been uploaded.";
            $FilePath = $targetDir . basename($_FILES["$file"]["name"]);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Sorry, there was an error uploading your file.";']);
            // return;
        }
    }
    return $FilePath;
}


// Delete Staff from database 
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'deleteFacultyDetails') {
    $result = $connection->query("DELETE FROM staff WHERE sno = " . $_GET['sno']);
    // if($result.num_rows() > 0) {
    //     echo json_encode(['data' => $staffDetails]);
    // }
    echo $_GET['sno'];
}

// Retrieving Admin data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['username'])) {
    $sql = "SELECT username, password FROM admin WHERE username = ? AND password = ?";

    // Bind parameters and execute the statement
    if ($stmt = $connection->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bind_param("ss", $_GET['username'], $_GET['password']);
        // Execute the statement
        $stmt->execute();

        // Bind result variables
        $stmt->bind_result($username, $password);

        // Fetch the result
        $stmt->fetch();

        // Check if a row was found
        if ($username !== null && $password !== null) {
            // Admin with provided username and password exists
            // Perform further actions here
            echo "ok";
        } else {
            // Admin not found or invalid credentials
            // Handle error or authentication failure
            echo "Admin not found or invalid credentials";
        }

        // Close statement
        $stmt->close();
    } else {
        // Error in preparing the statement
        // Handle the error
        echo "Error: " . $mysqli->error();
    }
}
// Close MySQLi connection
$connection->close();
?>