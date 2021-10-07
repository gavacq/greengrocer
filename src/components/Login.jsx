import { React, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../lib/context';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = userContext;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/login', { email, password })
      .then((res) => {
        console.log('response', res);
        setUser((prev) => ({
          ...prev,
          auth: res.data.auth,
          username: res.data.username,
        }));

        setEmail('');
        setPassword('');
      });
  };

  return (
    <main>
      <h1 className="login">
        GreenGrocer login
      </h1>
      <section>
        <form onSubmit={handleSubmit} className="login-form">

          <div className="inputs">
            <i className="far fa-envelope" />
            <input
              className="login-inputs"
              placeholder="email"
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <i className="fas fa-key" />
            <input
              className="login-inputs"
              placeholder="password"
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>
          <br />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </section>
    </main>
  );
}
