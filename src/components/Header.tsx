import { Link } from "@tanstack/react-router";
// TODO make link to work with both login and logout
export default function Header() {
    return <header className="flex flex-row w-full justify-between p-5" >

    <div  > <h1>Yomutsugi</h1> </div>
	<form>
	    <input type="search" placeholder="search"/>	
	</form> 
    <div>
	<nav>
	<Link to="/auth">Login</Link>
        </nav>
    </div>
    </header>
}
