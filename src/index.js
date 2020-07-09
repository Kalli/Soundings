import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const id = "d5a68a9ef8e6f9eb6b2efdc05eed"
if (document.getElementById(id)){
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById(id)
    )
}