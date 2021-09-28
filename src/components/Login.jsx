import { React, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../lib/context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAppContext();

  const height = {
    height: '50vh',
  };

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
      <h1>
        Login
      </h1>
      <section>
        <form onSubmit={handleSubmit} style={height}>
          <p>email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
