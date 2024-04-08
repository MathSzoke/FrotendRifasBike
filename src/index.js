import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer'

window.Buffer = window.Buffer ?? Buffer
let firstVisit = localStorage.getItem('firstVisit');

if (firstVisit !== 'false')
{
    localStorage.setItem('firstVisit', 'true');
    firstVisit = true;
}
else
{
    firstVisit = false;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Layout firstVisit={firstVisit} />
);