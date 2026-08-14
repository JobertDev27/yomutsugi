
export default function Header() {
    return <header className="flex flex-row w-full justify-between p-5" >

    <div  > <h1>Yomutsugi</h1> </div>
	<form>
	    <input type="search" placeholder="search"/>	
	</form> 
    <div>
	<nav>
	    <a href="/">Login</a>
        </nav>
    </div>
    </header>
}
