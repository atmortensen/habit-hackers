import React from 'react'
import Loading from '../../components/loading'
import makeList from './makeList'

function IdeasList(props) {
	if(!props.ideas) return <Loading /> 

	let list = makeList(props.search, props.ideas)
	if(list.length===0) list = <li>No Results</li>

	return <ul>{list}</ul>
}

export default IdeasList
