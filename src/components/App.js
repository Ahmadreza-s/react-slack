import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Link to={'/logout'}>Logout</Link><br/>
            <Link to={'/login'}>Login</Link><br/>

        </div>
    );
}

export default App;
