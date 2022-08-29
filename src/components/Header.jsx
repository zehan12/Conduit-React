import { NavLink } from 'react-router-dom'
import { MdSettings } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import PropTypes from 'prop-types';


// function checkAuthenication ( state ) {
//   do {
//      if ( state ) {
//       return <h1>hello</h1>
//      } else {
//       return <h1>not hell0</h1>
//      }
//   }
// }
function Header({ isLogedIn, user }) {



  return <header>
    <div className="container flex justify-between align-middle py-5 sm:bg-red-200 md:bg-purple-300 lg:bg-blue-700">
      <li className="list-none">
        <strong className="text-green-400 text-2xl">Conduit</strong>
      </li>
      <nav>
        <ul className="flex ml-3">
          <li className="text-sm text-gray-100 ml-4 ">
            <NavLink activeClassName='text-gray-400' to="/" exact> Home</NavLink>
          </li>

          {
            isLogedIn ?
              <>
                <li className="text-sm text-gray-100 ml-4 ">
                  <NavLink activeClassName='text-gray-400' className="flex align-middle" to="/editor" >
                    <FiEdit />
                    New Post
                    </NavLink>
                </li>

                <li className="text-sm text-gray-100 ml-4">
                  <NavLink activeClassName='text-gray-400' className="flex align-middle" to="/settings" >
                    <MdSettings />
                    Settings
                  </NavLink>
                </li>

                <li className="text-sm text-gray-100 ml-4 ">
                  <NavLink className="flex align-middle justify-evenly" activeClassName='text-gray-400'  to={ { pathname :`/profile/${ user.username }`} } >
                    <img className='w-7 h-7 rounded-3xl mr-2' src={user.image} alt={user.username} />
                    <p>{user.username}</p>
                  </NavLink>
                </li>
              </>
              :
              <>
                <li className="text-sm text-gray-100 ml-4 ">
                  <NavLink activeClassName='text-gray-400' to="/signin" >Sign In</NavLink>
                </li>

                <li className="text-sm text-gray-100 ml-4 ">
                  <NavLink activeClassName='text-gray-400' to="/signup" >Sign Up</NavLink>
                </li>
              </>
          }

        </ul>
      </nav>
    </div>
  </header>
}

Header.propTypes = {
  isLogedIn: PropTypes.bool,
  user: PropTypes.object
}

export default Header;