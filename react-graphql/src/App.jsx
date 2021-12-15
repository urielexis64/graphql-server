import {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import People from "./People";

import {gql, useQuery} from "@apollo/client";

const ALL_PEOPLE = gql`
	query {
		allPeople {
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

function App() {
	const {data, error, loading} = useQuery(ALL_PEOPLE);

	if (error) {
		return <span style={{color: "red"}}>{error}</span>;
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				{loading ? <p>Loading...</p> : <People people={data?.allPeople} />}
			</header>
		</div>
	);
}

export default App;
