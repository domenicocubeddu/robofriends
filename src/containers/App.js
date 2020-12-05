import React, { Component } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
//this is in the container folder because it contains "state". It's a special component that contains things and passes down state to components.

class App extends Component {
	constructor() {
		super() //we need to use this in order to call the construct of Component.
		//state is what describes our app, is something that can change and affect our app.
		this.state = { 
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')// fetch() is a tool to make requests to servers.
			.then(response => response.json())
			.then(users => this.setState({ robots: users }))
	}

	onSearchChange = (event) => { //anytime you make your own methods on a component use the arrow functions syntax. This makes sure that "this" value is according to where it was created.
		this.setState({ searchfield: event.target.value }); //anytime you want to change state you need to use setState() 
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
			return !robots.length ? //if statement
			<h1>Loading</h1> : //else
			(
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<Searchbox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>	
				</div>	
			)
	}
}

export default App