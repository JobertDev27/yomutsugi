import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { supabase } from '../utils/supabase'
import { useState } from 'react'

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
})


function RouteComponent() {
    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")

    const navigate = useNavigate()

    async function handleSignUp(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
	    email: email,
	    password: password,
	})
    }

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>, email: string, password: string) {
	e.preventDefault()
	const { data, error } = await supabase.auth.signInWithPassword({
	    email: email,
	    password: password,
	})
	if (data.user) {
	    navigate({to: "/"})
	}
	if (error) {
	    console.log(error)
	}
    }

    return <form onSubmit={(e)=> handleSignIn(e, email, pass)}>
    <input placeholder='name' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input placeholder='password' value={pass} onChange={(e) => setPass(e.target.value)} />
    <button type='submit'>submit</button>
    </form> 
}
