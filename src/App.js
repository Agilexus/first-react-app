import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import app from './App';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostItem from './components/PostItem';

function App() {
  const [value, setValue] = useState('Text in input')

  return (
    <div className="App">
    <PostItem/>
    <PostItem/>
    <PostItem/>
    </div>
  );
}

export default App;
