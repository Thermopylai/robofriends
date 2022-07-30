import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

const App = () => {
	const dispatch = useDispatch()
	const searchField = useSelector(state => state.searchRobots.searchField)
	const {robots, isPending, error} = useSelector(state => state.requestRobots)
	
	useEffect(() => {
		dispatch(requestRobots())
	}, [dispatch])
	
	const onSearchChange = (event) => {
		dispatch(setSearchField(event.target.value))
	}

	const filteredRobots = robots.filter((string) => {
		return string.name.toLowerCase().includes(searchField.toLowerCase());
	})

	if(isPending)
		return
			<h1 className='tc f1'>Loading...</h1> 
	if(!error) 
		return ( 
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	
}

export default App;