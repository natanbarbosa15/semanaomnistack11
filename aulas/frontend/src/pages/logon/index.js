import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiDownload } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory('');

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no Login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                    <a className="back-link" target="_blank" rel="noopener noreferrer" href="https://storage.googleapis.com/base-project-272815.appspot.com/bethehero/apk/bethehero.apk">
                        <FiDownload size={16} color="#E02041"/>
                        Download APK para Android
                    </a>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}