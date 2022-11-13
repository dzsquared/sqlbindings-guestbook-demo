import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { AddEntry } from './components/AddEntry';
import { addEntry } from './services/EntryService';

function App() {
    
    const [entry, setEntry] = useState({});

    const entryCreate = (e) => {
        addEntry(entry).then(res => {
            console.log(res);
            // TODO reset the page and add success message
        });
    }

    const onChangeForm = (e) => {
        if (e.target.id === 'newEntry') {
            entry.newEntry = e.target.value;
        }
        setEntry(entry);
    }

    return (
        <div className="App">
            <Header />
            <div className="container mrgnbtm">
                <div className="row">
                    <AddEntry onChangeForm={onChangeForm} addEntry={entryCreate} />
                </div>
            </div>
        </div>
    );
}

export default App;