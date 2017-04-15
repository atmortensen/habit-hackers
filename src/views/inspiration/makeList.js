import Fuse from 'fuse.js'
import React from 'react'

function makeList(search, ideasObj){
	let list = ideasObj
	const fuse = new Fuse(list, { keys: ['idea'] })
	
	if(search) list = fuse.search(search)

	return list.map((idea) => {
		return (
			<li 
				key={idea._id}>
				{idea.idea}
				
			</li>
		)
  })
	
}

export default makeList