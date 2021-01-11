import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

//this is in the container folder because it contains "state". It's a special component that contains things and passes down state to components.

//Using REACT HOOKS
function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchField] = useState('');
	const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	});

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => setRobots(users))
	}, []) // with an empty erray as a second parameter
				// is a shortcut for componentDidMount. So now it will only fetch once.

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	}

	return !robots.length ? //if statement
			<h1>Loading</h1> : //else
	    (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<Searchbox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>	
				</div>	
			)

}

export default App