import React, { useState }  from 'react';
import useDocument, { Document } from './document';

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
	return `M ${drag.initial.x - drag.offset.x} ${drag.initial.y - drag.offset.y} L ${drag.current.x - drag.offset.x} ${drag.current.y - drag.offset.y}`;
}

interface CanvasProps {
	doc: Document;
	addPath: Function;
}

const Canvas : React.FC<CanvasProps> = ({ doc, addPath }) => {
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

	return <div
		style={{ width: '1200px', height: '800px', background: '#eee' }}
		onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
				<path stroke='black' d={doc.paths.join(' ')}/>
				{
					drag.dragging ? (
						<path stroke='black' d={dString(drag)} />		
					) : undefined
				}
			</svg>
		</div>;
};

const App : React.FC = () => {
	const { doc, addPath, toCode } = useDocument();

  return (
		<div>
			<h1> Canvas </h1>
			<Canvas doc={doc} addPath={addPath} />
			<h1> Source </h1>
			<pre><code>{toCode()}</code></pre>
			<h1> Compiled </h1>
<pre>
<code>
...
</code>
</pre>
		</div>
  );
};

export default App;
