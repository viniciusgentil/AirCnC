import React, { useState } from 'react';
import api from '../../services/api';


export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handlerSubmit(e) {

        e.preventDefault(); // tratativa para navegador permanecer na página em questão

        const response =  await api.post('/sessions', { email }); // await: necessita do async para funcionar. Aguarda o retorno do post.

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>

            <form onSubmit={ handlerSubmit }>
                <label htmlFor="email">Email *</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Seu melhor email" 
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}