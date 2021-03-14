import { useReducer } from 'react';

export interface Document {
	paths: string[];
};

enum ActionType {
	AddPath,
}

type Action = { type: ActionType.AddPath, d: string };

const initialState : Document = {
	paths: []
};

const reducer = (state : Document, action : Action) => {
	switch(action.type) {
		case ActionType.AddPath:
			return {
				...state,
				paths: [
					action.d,
					...(state.paths)
				],
			};
	}

	return state;
};

const useDocument = () => {
	const [doc, dispatch] = useReducer(reducer, initialState);

	const addPath = (d: string) => {
		dispatch({ type: ActionType.AddPath, d });
	}

	const toCode = () => {
		return `
import React from 'react';

const Component = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <path stroke="black" d="${doc.paths.join(' ')}" />
    </svg>
  );
};

default export Component;
`;
	}

	return {
		doc,
		addPath,
		toCode,
	};
}

export default useDocument;
