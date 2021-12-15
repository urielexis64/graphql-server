import React from "react";

const People = ({people}) => {
	if (!people) {
		return <p>No people</p>;
	}

	return (
		<div>
			<h2>People</h2>
			{people.map((person, index) => (
				<div key={index}>
					<h3>{person.name}</h3>
					<p>{person.phone}</p>
					<p>{person.address.street}</p>
					<p>{person.address.city}</p>
				</div>
			))}
		</div>
	);
};

export default People;
