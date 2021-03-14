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
	SvgComponent: Function;
}

const Canvas : React.FC<CanvasProps> = ({ doc, addPath, SvgComponent }) => {
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

	const tool = drag.dragging ? (
		<path stroke='black' d={dString(drag)} />		
	) : undefined;

	return <div
		style={{ width: '1200px', height: '800px', background: '#eee' }}
		onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
		>
			<SvgComponent>{tool}</SvgComponent>
		</div>;
};


const Toolbar : React.FC = ({ children }) => {
	return <div>
	{children}
	</div>
}

const Tool : React.FC<{ children: string }> = ({ children }) => {
	return <label><input type="radio" name="toolbar-tool" value={children} />
	{children}
	</label>
}

const App : React.FC = () => {
	const {
		doc,
		addPath,
		toCode,
		toCompiled,
		SvgComponent,
	} = useDocument();

  return (
		<div>
			<h1> Canvas </h1>
			<Toolbar>
				<Tool>Select</Tool>
				<Tool>Line Tool</Tool>
				<Tool>Freehand</Tool>
			</Toolbar>
			<Canvas doc={doc} addPath={addPath} SvgComponent={SvgComponent} />
			<h1> Source </h1>
			<pre><code>{toCode()}</code></pre>
			<h1> Compiled </h1>
			<pre><code>{toCompiled()}</code></pre>
		</div>
  );
};

export default App;
