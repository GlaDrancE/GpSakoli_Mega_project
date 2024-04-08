<?php
require_once 'vendor/autoload.php'; // Include Composer's autoloader

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Create a new MySQLi connection
$connection = new mysqli($_ENV['MYSQL_HOST'], $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD'], $_ENV['MYSQL_DATABASE']);

// Check connection
if ($connection->connect_error) {
    die ("Connection failed: " . $connection->connect_error);
}

// Allow from any origin
if (isset ($_SERVER['HTTP_ORIGIN'])) {
    // Should match * or the origin of your frontend application
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset ($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset ($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit (0);
}

// Endpoint to retrieve lab data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['labs'])) {
    $result = $connection->query("SELECT * FROM labs");
    $labs = [];
    while ($row = $result->fetch_assoc()) {
        $labs[] = $row;
    }
    echo json_encode(['data' => $labs]);
}

// Endpoint to retrieve curriculum data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['curriculum'])) {
    $result = $connection->query("SELECT * FROM curriculum");
    $curriculum = [];
    while ($row = $result->fetch_assoc()) {
        $curriculum[] = $row;
    }
    echo json_encode(['data' => $curriculum]);
}

// Endpoint to retrieve staff details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['staff-details'])) {
    $result = $connection->query("SELECT * FROM staff");
    $staffDetails = [];
    while ($row = $result->fetch_assoc()) {
        $staffDetails[] = $row;
    }
    echo json_encode(['data' => $staffDetails]);
}

// Endpoint to retrieve supporting staff details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['supporting-staff-details'])) {
    $result = $connection->query("SELECT * FROM supporting_staff");
    $supportingStaffDetails = [];
    while ($row = $result->fetch_assoc()) {
        $supportingStaffDetails[] = $row;
    }
    echo json_encode(['data' => $supportingStaffDetails]);
}

// Endpoint to retrieve department portfolio data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['dept-portfolio'])) {
    $result = $connection->query("SELECT * FROM dept_portfolio");
    $deptPortfolio = [];
    while ($row = $result->fetch_assoc()) {
        $deptPortfolio[] = $row;
    }
    echo json_encode(['data' => $deptPortfolio]);
}


// Endpoint to Insert Alumni Registration data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset ($_GET['action']) && $_GET['action'] === 'insertAlumniDetails') {
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
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset ($_GET['action']) && $_GET['action'] === 'insertStudentAdmissionDetails') {
    $studnetAdmissionData = json_decode(file_get_contents('php://input'), true);
    print_r($studnetAdmissionData);
    $enrollment = $studnetAdmissionData['enrollment'];
    $aadharNo = $studnetAdmissionData['aadharNo'];
    $name = $studnetAdmissionData['name'];
    $email = $studnetAdmissionData['email'];
    $phone = $studnetAdmissionData['phone'];
    $admissionYear = $studnetAdmissionData['admissionYear'];
    $directSecondYear = $studnetAdmissionData['directSecondYear'];
    $gender = $studnetAdmissionData['gender'];
    // Add other staff details here...
    $stmt = $connection->prepare("INSERT INTO students_admission_confirmation (enrollment, aadharNo, name, email, phone, gender, admissionYear, directSecondYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $enrollment, $aadharNo, $name, $email, $phone, $gender, $admissionYear, $directSecondYear);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Student Admission data stored successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Failed to store student admission data']);
    }
}


// Retrieving Admin data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset ($_GET['username'])) {
    $result = $connection->query('SELECT username, password FROM admin WHERE username = ' . $_GET['username'] . 'AND password = ' . $_GET['password']);
    if ($result->num_rows > 0) {
        echo 'ok';
    } else {
        echo 'Invalid admin';
    }
    echo "working";

}

// Close MySQLi connection
$connection->close();
?>