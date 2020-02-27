import React from "react";
import ReactDOM from "react-dom";
import { exhaustiveCheck } from "ts-exhaustive-check";
import { Dispatch, Program } from "@typescript-tea/core";

// -- STATE

type State = number;
const init = (): readonly [State] => [0];

// -- UPDATE

type Action = { type: "Increment" } | { type: "Decrement" };

function update(action: Action, state: State): readonly [State] {
  switch (action.type) {
    case "Increment":
      return [state + 1];
    case "Decrement":
      return [state - 1];
    default:
      return exhaustiveCheck(action, true);
  }
}

// -- VIEW

const view = ({
  dispatch,
  state
}: {
  readonly dispatch: Dispatch<Action>;
  readonly state: State;
}) => (
  <div>
    <button onClick={() => dispatch({ type: "Increment" })}>+</button>
    <div>{state}</div>
    <button onClick={() => dispatch({ type: "Decrement" })}>-</button>
  </div>
);

// -- PROGRAM

const program: Program<State, Action, JSX.Element> = {
  init,
  update,
  view
};

// -- RUN

const app = document.getElementById("app");
const render = (view: JSX.Element) => ReactDOM.render(view, app);
Program.run(program, render);
