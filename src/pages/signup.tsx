import {useRef, useState} from "react";

export default function Signup() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);

    async function handleLogin() {
        const resp = await fetch('http://localhost:3000/api/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
        });
        const json = await resp.json();
        setMessage(json);
    }

    return <div>
        <h1>Create a new User!</h1>
        <pre>{JSON.stringify(message)}</pre>
        <input type="text" placeholder="name" ref={nameRef}/>
        <input type="text" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passRef}/>
        <button onClick={handleLogin}>Login</button>
    </div>
}