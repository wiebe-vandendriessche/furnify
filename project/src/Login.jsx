import './App.css'
import Form from "react-bootstrap/Form";
import {FloatingLabel} from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import App from "./App.jsx";
import {Route, Router, Routes} from "react-router-dom";

function Login() {

    // State to store login credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === import.meta.env.VITE_ADMIN && password === import.meta.env.VITE_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<App/>}/>
                </Routes>
            ) : (
                <Form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw'
                }}>
                    <FloatingLabel className={'mb-2'} controlId="floatingInput" label={'Username'}>
                        <Form.Control
                            name={'username'}
                            type="text"
                            placeholder={'Username'}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel className={'mb-2'} controlId="floatingPassword" label={'Password'}>
                        <Form.Control
                            name={'password'}
                            type="password"
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    <Button variant={'danger'} type="submit">Login</Button>
                </Form>
            )}
        </div>
    );
}

export default Login;