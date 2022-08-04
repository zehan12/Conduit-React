import { NavLink } from 'react-router-dom'
function Header() {
  return <header>
    <div className="container flex justify-between align-middle py-5 sm:bg-red-200 md:bg-purple-300 lg:bg-yellow-400">
      <li className="list-none">
        <strong className="text-green-400 text-2xl">Conduit</strong>
      </li>
      <nav>
        <ul className="flex ml-3">
          <li className="text-sm text-gray-100 ml-4 ">
            <NavLink activeClassName='text-gray-400' to="/" exact> Home</NavLink> 
          </li> 
          <li className="text-sm text-gray-100 ml-4 ">
            <NavLink activeClassName='text-gray-400' to="/signup" >Sign Up</NavLink>
          </li>
          <li className="text-sm text-gray-100 ml-4 ">
            <NavLink activeClassName='text-gray-400' to="/signin" >Sign In</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
}


export default Header;