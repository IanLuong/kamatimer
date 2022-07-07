import React, { useState } from 'react';


function App() {

    const [time, setTime] = useState(0)

    return (
        <div className="App">
            <div className="container">
                <h1 className='time'>{time}</h1>
            </div>
        </div>
    );
}

export default App;
