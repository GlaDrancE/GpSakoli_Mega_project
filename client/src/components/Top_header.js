import React from 'react'

export default function Top_header() {
    return (
        <div className="top-header flex w-100 justify-between px-2 items-center bg-red-500">
            <div className="phone-email flex text-white">
                <div className="phone-number">
                    <a href="tel:+07186295112">07186-295112</a>
                </div>
                /
                <div className="phone-number">
                    <a href="mailto:office.gpsakoli@dtemaharashtra.gov.in"><u> office.gpsakoli@dtemaharashtra.gov.in</u></a>
                </div>
            </div>
            <div className="language-change-container flex items-center">
                <select name="language" id="language" className='text-white mx-2 px-2 py-1 font-semibold border-0 text-xs'>
                    <option value="English">Engilsh</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                </select>
                <div className="font-change flex font-bold text-white mx-2">
                    <div id="font-inc"> A+ </div> / <div id="font-dec"> A- </div>
                </div>
            </div>
        </div>
    )
}
