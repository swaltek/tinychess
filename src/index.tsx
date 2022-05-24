import * as ReactDOM from 'react-dom';
import * as React from 'react';

const App = () => {
  const app_name: string = 'minimal_react_app';
  return <h1>{`Welcome to ${app_name.toUpperCase()}!`}</h1>;
}

ReactDOM.render(<App />, document.getElementById('app'));

