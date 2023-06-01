import React, { useState } from 'react';
import Calendar from 'react-calendar';

type  ValuePiece = Date|null;

function App() {
    const [value, onChange] = useState<ValuePiece|[ValuePiece,ValuePiece]>(new Date());

    return (
        <div className="App">
            <Calendar value={value} onChange={onChange} selectRange={false}/>
        </div>
    );
}

export default App;