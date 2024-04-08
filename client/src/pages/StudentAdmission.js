import React from 'react'
import { Slider } from '../components/Slider'
import Footer from '../components/Footer'
import { CollapseDropdown } from '../components/Dropdown'
import pdf from "../pdfs/student-corner/Rules_22_23.pdf"
export const StudentAdmission = () => {
    return (
        <>
            <Slider />
            <div className='main-container'>
                <CollapseDropdown data={{ name: "First Year & Direct Second Year Diploma Information Brochure 2022-23", path: "student-corner/FEAdmission_22_23.pdf", showCD: true }} />
                <CollapseDropdown data={{ name: "Rules 2022 - 2023", path: "student-corner/Rules_22_23.pdf", showCD: false }} />
            </div>
        </>
    )
}
