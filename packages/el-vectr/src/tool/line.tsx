import React, { useState } from 'react';
import { Document } from '../document';

interface Vector {
	x: number;
	y: number;
}

interface Draggable {
	dragging: boolean;
	initial: Vector;
	current: Vector;
	offset: Vector;
}

const dString = (drag : Draggable) => {
	return `M${drag.initial.x - drag.offset.x},${drag.initial.y - drag.offset.y}L${drag.current.x - drag.offset.x},${drag.current.y - drag.offset.y}`;
}

interface Props {
	doc: Document;
	addPath: Function;
	children: Function;
}

const Line : React.FC<Props> = ({ doc, addPath, children }) => {
	const initialState : Draggable = {
		dragging: false,
		initial: { x: 0, y: 0 },
		current: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
	};
	const [drag, setDrag] = useState<Draggable>(initialState);

	const onMouseDown = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
		if(e.button === 0) {
			e.stopPropagation();
			const bounding = (e.target as HTMLElement).getBoundingClientRect();
			setDrag({
				dragging: true,
				initial: {
					x: e.clientX,
					y: e.clientY,
				},
				offset: {
					x: bounding.x,
					y: bounding.y,
				},
				current: {
					x: e.clientX,
					y: e.clientY,
				}
			});
		}
	};
	const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
	const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if(drag.dragging) {
			addPath(dString(drag));
			setDrag(initialState);
		}
	};

	const Tool = () => drag.dragging ? (
		<path stroke='black' d={dString(drag)} />		
	) : null;

	const ChildComponent : React.FC = children as any;

	return <div
		onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
	>
		<ChildComponent>
			<Tool />
		</ChildComponent>
	</div>;
};

export default Line;
