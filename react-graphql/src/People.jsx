import React, {useEffect, useState} from "react";
import {useLazyQuery, gql} from "@apollo/client";

const FIND_PERSON = gql`
	query findPersonByName($name: String!) {
		findPerson(name: $name) {
			id
			name
			phone
			address {
				street
				city
			}
		}
	}
`;

const People = ({people}) => {
	const [getPerson, result] = useLazyQuery(FIND_PERSON);
	const [person, setPerson] = useState(null);

	const showPerson = (name) => {
		getPerson({
			variables: {
				name,
			},
		});
	};

	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson);
		}
	}, [result]);

	if (person) {
		return (
			<div>
				<h2 onClick={() => setPerson(null)}>{person.name}</h2>
				<p>{person.phone}</p>
				<p>{person.address.street}</p>
				<p>{person.address.city}</p>
			</div>
		);
	}

	if (!people) {
		return <p>No people</p>;
	}

	return (
		<div>
			<h2>People</h2>
			{people.map((person, index) => {
				return (
					<div key={index} onClick={() => showPerson(person.name)}>
						<h3>{person.name}</h3>
						<p>{person.phone}</p>
						<p>{person.address.street}</p>
						<p>{person.address.city}</p>
					</div>
				);
			})}
		</div>
	);
};

export default People;
