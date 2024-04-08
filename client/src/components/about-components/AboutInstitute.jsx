import React from "react";
import Vision_Mission from "../Vision_Mission";
export default function DeptAbout() {
	return (
		<>
			<div className="institute-desc text-justify p-2">
				<p>
					The Government Polytechnic ,Sakoli , was founded on July,
					1914 . At its commencement the school had 16 students on
					roll. The institution has given to Engineering College
					presently known as V.N.I.T. Sakoli, as well as Govt. Medical
					College (GMC), Sakoli. The total intake capacity of all
					programmes is 860 students (first shift 680 and second shift
					180 ). the premises of this institute is spread over 22
					acres of land with good infra-structure facilities like well
					equipped laboratories, Computer center, conference hall
					,Audio-Visual Room, Community Hall, Gymnasium, Good play
					ground etc. Accommodation for 180 boys, 54 girls and 20
					trainees is also available in the campus.
				</p>
				<p>
					Govt of Maharashtra awarded academic autonomy to this
					institute in the year 1995. Staff development cell is
					established to organize training programmes for faculty
					members and supporting staff all over the state. Networking
					and Internet service, computerized Library services to staff
					and students are provided. Boys and Girls hostel is
					facilitated with Broadband internet.
				</p>
				<p>
					The institute generates revenue every year ( around Rs.1.25
					corer ) through Continuing Education Programmes,
					Consultancy, Testing, Hiring of facilities etc. and plans to
					enhance it in near future. The World bank Assisted project
					was implemented at this institute from 1994 to 1999 for
					improvement of quality of technician education. Canada-India
					Institute Industry Linkage Project was implemented in the
					institute from 2000-2004.
				</p>
				<p>
					The institute was awarded World bank assisted technical
					education quality improvement program (TEQIP) and received
					Rs. 2.55 corer for improvement of education, Networking of
					institute and services to community.
				</p>

				<p>
					This institute received ISTE Monjee award for overall best
					performance in the year 1996 and best polytechnic award of
					Government of Maharashtra in the year 1997. The institute is
					marching towards center of Excellence, which means
					performing high, offering academic service of excellent
					quality to both regular students as well as working
					personnel form industry.
				</p>
			</div>
			<Vision_Mission
				vision={
					"To be an institute of national repute creating technocrats to serve the society."
				}
				mission={[
					"To set up state of the art infrastructure, laboratories, library and supporting services.",
					"To achieve academic excellence in teaching and learning through continuous development using latest technologies and resources.",
					"To inculcate technical and entrepreneurial skills, moral and ethical values in students.",
					"To build strategic networking with alumni, industries and academic institutions.",
				]}
			/>
		</>
	);
}
