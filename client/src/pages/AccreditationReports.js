import React, { useEffect, useState } from 'react'
import { Slider } from '../components/Slider'
import SideMenu from '../components/SideMenu'
import { useParams } from 'react-router-dom'

import { NBAaccreditation } from '../components/accreditation-reports/NBAaccreditation'
import { EoaReports } from '../components/accreditation-reports/EoaReports'
import { MonitoringReports } from '../components/accreditation-reports/MonitoringReports'
import { AuditReports } from '../components/accreditation-reports/AuditReports'

export const AccreditationReports = () => {
    const { page } = useParams();
    const [auditReport, setAuditReport] = useState([])
    const [monitoringReport, setMonitoringReport] = useState([])
    let MenuLinks = [
        { name: 'NBA Accreditation', path: '/accreditation-reports/nba-accreditation' },
        { name: 'EOA (AICTE) Reports', path: '/accreditation-reports/eoa-reports' },
        { name: 'Monitoring Report', path: '/accreditation-reports/monitoring-reports' },
        { name: 'Audit Report', path: '/accreditation-reports/audit-reports' }
    ]

    useEffect(() => {

        const auditReport = async () => {
            let response = await fetch("http://localhost:8012/api/connection.php?auditReport", {
                method: "GET"
            });

            let data = await response.json();
            setAuditReport(data.data)
            console.log(data.data);
        }
        const monitoringReport = async () => {
            let response = await fetch("http://localhost:8012/api/connection.php?monitoringReport", {
                method: "GET"
            });

            let data = await response.json();
            setMonitoringReport(data.data)
            console.log(data.data);
        }


        monitoringReport();
        auditReport();
    }, [])
    return (
        <>
            <Slider />
            <div className="main-container">
                <div className="text-center">
                    <h1 className="heading"><span className='heading-red'>NBA</span> Accreditation</h1>
                </div>
                <div className="dynamic-container">
                    <div className="dynamic-change-container">
                        {page === 'nba-accreditation' && <NBAaccreditation />}
                        {page === 'eoa-reports' && <EoaReports />}
                        {page === 'monitoring-reports' && <MonitoringReports data={monitoringReport} />}
                        {page === 'audit-reports' && <AuditReports data={auditReport} />}
                    </div>
                    <SideMenu links={MenuLinks} />
                </div>
            </div>
        </>
    )
}
