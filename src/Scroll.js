import React from 'react';

const Scroll = (props) => {//using .children, we can create Components that wrap other Components.
	return (
		<div style={{overflowY: 'scroll', height: '500px'}}>
			{props.children}
		</div>
	)
}

export default Scroll