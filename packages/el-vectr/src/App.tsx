import React  from 'react';
import useDocument, { Document } from './document';
import Line from './tool/line';

const Toolbar : React.FC = ({ children }) => {
	return <div>
	{children}
	</div>;
};

const Tool : React.FC<{ children: string }> = ({ children }) => {
	return <label><input type="radio" name="toolbar-tool" value={children} />
	{children}
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
			<Canvas doc={doc} addPath={addPath} SvgComponent={SvgComponent} Tool={Line} />
			<h1> Source </h1>
			<pre><code>{toCode()}</code></pre>
			<h1> Compiled </h1>
			<pre><code>{toCompiled()}</code></pre>
		</div>
  );
};

export default App;
