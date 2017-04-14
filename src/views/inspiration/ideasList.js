import React from 'react'
import Loading from '../../components/loading'
// import levenshtein from 'fast-levenshtein'

const IdeasList = function(props){
	if(!props.ideas) return <Loading /> 

	let list = props.ideas.filter((idea) => {
		return idea.idea.indexOf(props.search)!==-1 ? true: false
	}).map((idea) => {
		return (
			<li 
				key={idea._id}>
				{idea.idea}
				<a 
					href="#" 
					onClick={props.remove.bind(null, idea._id)}>
					X
				</a>
			</li>
		)
  })

	if(list.length===0) list = <li>No Results</li>

	return <ul>{list}</ul>
}

export default IdeasList