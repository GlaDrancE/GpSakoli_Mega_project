import React from 'react'

export default function Table({ data }) {
    console.log(data)
    return (
        <>
            <table border="1px">
                <thead>
                    <tr>
                        {data[0].columns.map((c, index) => (
                            <td key={index}>{c}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data[1].rows.map((row, index) => (
                            <tr key={index}>
                                {row.map((r, index) => (
                                    <td key={index}>{r}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
