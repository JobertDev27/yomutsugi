import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { supabase } from '../utils/supabase'
import React, { useState } from 'react'

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
})


function RouteComponent() {
    const [hasAccount, setHasAccount] = useState<boolean>(true)

    const navigate = useNavigate()

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault()
	const form = new FormData(e.currentTarget)

	const { data, error } = await supabase.auth.signUp({
	    email: form.get("email") as string,
	    password: form.get("password") as string,
	})
    }

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault()
	const form = new FormData(e.currentTarget)
	
	const { data, error } = await supabase.auth.signInWithPassword({
	    email: form.get("email") as string,
	    password: form.get("password") as string,
	})
	if (data.user) {
	    navigate({to: "/"})
	}
	if (error) {
	    console.log(error)
	}
    }

    return ( 
	    <>
	    <main className='flex items-center justify-center h-dvh'>
	    <form className='flex flex-col gap-5 items-center justify-center md:p-10 p-4 bg-surface border border-border rounded-md md:w-150 h-150 w-full'
	    onSubmit={(e)=> hasAccount ? handleSignIn(e) : handleSignUp(e)}>
	    <h1 className='text-2xl font-bold'>{hasAccount ? "LOGIN" : "SIGN-UP"}</h1>
	    <div className='flex flex-col w-full gap-2'>
	    <label>Email Address</label>
	    <input className='bg-bg p-2' placeholder='Email' name="email" />
	    </div>
	    <div className='flex flex-col w-full gap-2'>
	    <label>Password</label>
	    <input className='bg-bg p-2' placeholder='Password' name="password" />
	    {!hasAccount && (
	    <>
	    <label>Confirm Password</label>
	    <input className='bg-bg p-2' placeholder='Retype Password' name="confirmPassword" />
	    </>
	    )}
	    </div>
	    <div className='w-full py-5 flex flex-row justify-between items-center'>
		{hasAccount && <Link to='/auth'>Forgot Password?</Link>}
		<button type='button' className='cursor-pointer' onClick={() => setHasAccount(prev => !prev)}>{hasAccount ? "No Account? Sign-up" : "Already have an account? Login"}</button>
	    </div>
	    <button className='bg-accent text-bg! font-bold py-3 rounded-full w-full cursor-pointer' type='submit'>{hasAccount ? "Login" : "Sign-Up"}</button>
	    </form> 
	    </main>
	    </>
	   )

}
