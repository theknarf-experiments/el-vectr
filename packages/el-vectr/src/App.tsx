import React, { useState } from 'react';
import useDocument, { Document } from './document';
import Line from './tool/line';

interface ToolbarProps {
	onChange: (str: string) => void;
}

const Toolbar : React.FC<ToolbarProps> = ({ onChange, children }) => {
	const onChangeInternal = (e : any) => {
		onChange(e.target.value);
	}

	return <div onChange={onChangeInternal}>
	{children}
	</div>;
};

interface ToolProps {
 children: string;
 value: string;
 checked?: boolean;
}

const Tool : React.FC<ToolProps> = ({ children, value, checked=false }) => {
	return <label>
		<input type="radio" name="toolbar-tool" value={value} defaultChecked={checked} />
		<span>{children}</span>
	</label>;
};

interface CanvasProps {
	doc: Document;
	addPath: Function;
	SvgComponent: Function;
	Tool: Function;
}

const Canvas : React.FC<CanvasProps> = ({ doc, addPath, SvgComponent, Tool }) => {
	const RenderComp : React.FC = ({ children }) => (
		<div style={{ width: '1200px', height: '800px', background: '#eee' }}>
			<SvgComponent>{children}</SvgComponent>
		</div>
	);

	return <Tool doc={doc} addPath={addPath}>{RenderComp}</Tool>
};

const NoTool : React.FC = () => {
	return <div>
		Tool not implemented
	</div>;
}

const App : React.FC = () => {
	const {
		doc,
		addPath,
		toCode,
		toCompiled,
		SvgComponent,
	} = useDocument();
	const [ tool, setTool ] = useState<Function>(() => Line);
	const onChange = (type: string) => {
		switch(type) {
			case 'line':
				setTool(() => Line);
			break;
			default:
				setTool(() => NoTool);
		}
	}

  return (
		<div>
			<h1> Canvas </h1>
			<Toolbar onChange={onChange}>
				<Tool value="select">Select</Tool>
				<Tool value="line" checked={true}>Line Tool</Tool>
				<Tool value="freehand">Freehand</Tool>
			</Toolbar>
			<Canvas doc={doc} addPath={addPath} SvgComponent={SvgComponent} Tool={tool} />
			<h1> Source </h1>
			<pre><code>{toCode()}</code></pre>
			<h1> Compiled </h1>
			<pre><code>{toCompiled()}</code></pre>
		</div>
  );
};

export default App;
