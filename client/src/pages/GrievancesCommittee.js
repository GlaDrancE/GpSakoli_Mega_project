import React, { useState, useEffect } from 'react'
import Table from '../components/Table';
import { Slider } from '../components/Slider';
import { useParams } from 'react-router-dom';

export const GrievancesCommittee = () => {
    const [committeeData, setCommitteeData] = useState([])
    const { committee } = useParams();
    // const committeeData = [
    //     { columns: ["Sr No.", "Faculty Name", "Designation", "Mobile No."] },
    //     {
    //         rows: [
    //             ["1", "Mrs. K. M. Gaidhane, Sr. Lecturer, Electrical Engg. Dept", "Co-ordinator", "9970076839"],
    //             ["2", "Mrs. S. N. Katekar(Gadekar), Chemistry Lecturer", "Member", "9923815060"],
    //             ["3", "Mrs. K. P. Thaware, Lecturer, Mech. Engg. Dept", "Member", "8600013881"],
    //             ["4", "Mr. V. B. Khobragade, Lecturer, Computer Tech. Dept", "Member", "9766953403"],
    //             ["5", "Mr.N. C. Basena, I/c Registrar", "Member", "9503269764"],
    //             ["6", "Dr.Sakuntala. H. Kapgate, Doctor", "Member", "7507096115"],
    //             ["7", "Mrs.Suchita. Agashe, NGO", "Member", "8390727718"]
    //         ],
    //     },
    // ]


    useEffect(() => {
        let data;
        console.log(committee);
        if (committee === 'women-grievance-commitee') {
            data = [
                { columns: ["Sr No.", "Faculty Name", "Designation", "Mobile No."] },
                {
                    rows: [
                        ["1", "Mrs. K. M. Gaidhane, Sr. Lecturer, Electrical Engg. Dept", "Co-ordinator", "9970076839"],
                        ["2", "Mrs. S. N. Katekar(Gadekar), Chemistry Lecturer", "Member", "9923815060"],
                        ["3", "Mrs. K. P. Thaware, Lecturer, Mech. Engg. Dept", "Member", "8600013881"],
                        ["4", "Mr. V. B. Khobragade, Lecturer, Computer Tech. Dept", "Member", "9766953403"],
                        ["5", "Mr.N. C. Basena, I/c Registrar", "Member", "9503269764"],
                        ["6", "Dr.Sakuntala. H. Kapgate, Doctor", "Member", "7507096115"],
                        ["7", "Mrs.Suchita. Agashe, NGO", "Member", "8390727718"]
                    ],
                },
            ]
        }
        else if (committee === "sc-st-committee") {
            data = [
                {
                    columns: ["Sr No.", "Faculty Name", "Designation"],
                    rows: [
                        ["1", "Mrs. V. V. Tekam, Lecturer, Elect. & Telecomm. Dept", "Co-ordinator"],
                        ["2", "Mr. V. B. Khobragade, Lecturer, Computer Tech. Dept", "Member"],
                        ["3", "Mr. S. R. Ahirkar, Lecturer, Elect. Engg. Dept", "Member"],
                        ["4", "Mrs. D. A. Khandare, Lecturer, Civil Engg. Dept", "Member"],
                        ["5", "Mrs. K. P. Thaware, Lecturer, Mech. Engg. Dept", "Member"]
                    ]
                }
            ]
        }
        else if (committee === "iste-committee") {
            data = [
                {
                    columns: ["Sr No.", "Faculty Name", "Designation"],
                    rows: [
                        ["1", "Mr. D. A. Brahmankar, Lecturer, Elect. & Telecomm. Dept", "Co-ordinator"],
                        ["2", "Mrs. P. P. Kotangale, Lecturer, Elect. & Telecomm. Dept", "Member"],
                        ["3", "Mr. A. V. Abhyankar, Lecturer, Mech. Engg. Dept", "Member"],
                        ["4", "Mr. S. D. Rokde, I/c Registrar", "Member"],
                        ["5", "Mr. V. H. Dhote, Lab Assist.", "Member"],
                        ["6", "Ku. Kajal Bante, Student Representative", "Member"],
                        ["7", "Mr. Tushar Ilame, Student Representative", "Member"]
                    ]
                }

            ]
        }
        else if (committee === "anti-ragging-committee") {
            data = [
                {
                    columns: ["Sr No.", "Faculty Name", "Designation"],
                    rows: [
                        ["1", "Mr. S. P. Lambhade, I/c Principal", "Chairman"],
                        ["2", "Mr. A. A. Ali, HoD, Elect. & Telecomm. Dept", "Member"],
                        ["3", "Mr. V. G. Kondekar, HoD, Civil Engg. Dept", "Member"],
                        ["4", "Mr. V. A. Wararkar, I/c HoD, Electrical Engg.", "Member"],
                        ["5", "Mr. V. B. Khobragade, I/c HoD, Computer Tech. Dept", "Member"],
                        ["6", "Mr. K. N. Potode, Lecturer, Electrical Engg. Dept.", "Member"],
                        ["7", "Mrs. D. A. Khandare, Lecturer Civil Engg.", "Member"]
                    ]
                }

            ]
        }
        setCommitteeData(data)
    }, [committee])
    return (
        <>
            {console.log(committeeData)}
            <Slider />
            {!committeeData && <div className="main-container">
                <h1 className="heading text-center">Grievances <span className="heading-red"> Committee</span></h1>
                <Table data={committeeData} />
            </div>}
        </>
    )
}
