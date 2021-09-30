import { React, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../lib/context';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/login', { email, password })
      .then((res) => {
        console.log('response', res);
        setUser((prev) => ({
          ...prev,
          auth: res.data.auth,
        }));

        setEmail('');
        setPassword('');
      });
  };

  return (
    <main>
      <h1 className="login">
        Login
      </h1>
      <section>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="inputs">
            <label
              htmlFor="email"
            >
              email
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label
              htmlFor="email"
            >
              password
              <input
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </section>
    </main>
  );
}
