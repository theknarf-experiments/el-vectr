import React, { useState }  from 'react';

interface Vector {
	x: Number;
	y: Number;
}

interface Draggable {
	dragging: Boolean;
	initial: Vector;
	current: Vector;
}

const dString = (drag : Draggable) => `M ${drag.initial.x} ${drag.initial.y} L ${drag.current.x} ${drag.current.y}`;

const Canvas : React.FC = () => {
	const [d, setD] = useState('');

	const initialState =  {
		dragging: false,
		initial: { x: 0, y: 0 },
		current: { x: 0, y: 0 },
	};
	const [drag, setDrag] = useState(initialState);

	const onMouseDown = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if(e.button === 0) {
			e.stopPropagation();
			setDrag({
				dragging: true,
				initial: {
					x: e.clientX,
					y: e.clientY,
				},
				current: {
					x: e.clientX,
					y: e.clientY,
				}
			});
		}
	};
	const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if(drag.dragging) {
			setDrag({
				...drag,
				current: {
					x: e.clientX,
					y: e.clientY,
				}
			});
		}

	};
	const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if(drag.dragging) {
			setD(d + dString(drag));
			setDrag(initialState);
		}
	};

	return <div
		style={{ width: '1200px', height: '800px', background: '#eee' }}
		onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
				<path stroke='black' d={d}/>
				{
					drag.dragging ? (
						<path stroke='black' d={dString(drag)} />		
					) : undefined
				}
			</svg>
		</div>;
};

const App : React.FC = () => {
  return (
		<div>
			<Canvas />
		</div>
  );
};

export default App;
