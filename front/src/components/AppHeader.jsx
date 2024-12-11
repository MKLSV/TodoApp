import React, { useState } from 'react';

import allImg from '../assets/icons/all.png'
import manImg from '../assets/icons/man.png'
import womanImg from '../assets/icons/woman.png'

import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

export default function AppHeader({ user, sort, setSort, setUser }) {

    const [onSelect, setOnSelect] = useState(false)

    return (
        <header className='app-header'>
            <div className="head-header">
                <span className='title'>{sort === 'data' ? 'Date View' : sort === 'type' ? 'Tasks' : 'Done'}</span>
                <div className="user-select">
                    {user === 'Для всех' ?
                        <img src={allImg} alt='' />
                        :
                        user === 'Матвей' ?
                            <img src={manImg} alt='' />
                            :
                            <img src={womanImg} alt='' />}

                    {onSelect ?
                        <div className="select-user">
                            <MdExpandLess onClick={() => setOnSelect(false)} />
                            <div className="user-options">

                                <option
                                    className={user === 'Для всех' ? 'active' : ""}
                                    value="Для всех"
                                    onClick={() => {
                                        setUser("Для всех");
                                        setOnSelect(false);
                                    }}
                                >
                                    Для всех
                                </option>

                                <option
                                    className={user === 'Делайла' ? 'active' : ""}
                                    value="Делайла"
                                    onClick={() => {
                                        setUser("Делайла");
                                        setOnSelect(false);
                                    }}
                                >
                                    Делайла
                                </option>
                                <option
                                    className={user === 'Матвей' ? 'active' : ""}
                                    value="Матвей"
                                    onClick={() => {
                                        setUser("Матвей");
                                        setOnSelect(false);
                                    }}
                                >
                                    Матвей
                                </option>
                            </div>
                        </div>
                        :
                        <div className="select-user">
                            <MdExpandMore onClick={() => setOnSelect(true)} />
                        </div>

                    }
                </div>
                {/* <select
                    id="owner"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="user-input"
                >
                    <option value="Для всех">Для всех</option>
                    <option value="Делайла">Делайла</option>
                    <option value="Матвей">Матвей</option>
                </select> */}
            </div>
            <div className="header-btns">
                <div className={sort === 'type' ? 'btn type active' : 'btn type'} onClick={() => setSort('type')}>
                    <span>По типу</span>
                </div>
                <div className={sort === 'data' ? 'btn data active' : 'btn data'} onClick={() => setSort('data')}>
                    <span>По дате</span>
                </div>
                <div className={sort === 'done' ? 'btn done active' : 'btn done'} onClick={() => setSort('done')}>
                    <span>Завершенные</span>
                </div>
            </div>
        </header>
    )
}