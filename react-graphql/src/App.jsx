import {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	useEffect(() => {
		fetch("http://localhost:4000/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          query {
            allPeople {
              name
              phone
            }
          }
        `,
			}),
		})
			.then((res) => res.json())
			.then((res) => console.log(res.data));
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>GraphQL + React!</p>
			</header>
		</div>
	);
}

export default App;
