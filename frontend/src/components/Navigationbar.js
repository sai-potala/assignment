import React from 'react'
import{Link} from 'react-router-dom'
import{useState} from 'react'

function Navigationbar(props) {
  const [userInfo, setUserinfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo"))
  );
  console.log("props is ",props)
    return (
      <div>
        <>
          <nav>
            <ul className="nav-items">
              <div className="nav-items-inner-div">
                <li>
                  <h3>Welcome</h3>
                </li>
                <li>
                  <Link onClick={() => props.toggleHandler("Home")}>Home</Link>
                </li>
                <li>
                  <Link onClick={() => props.toggleHandler("Profile")}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={() => props.toggleHandler("Card")}>Cards</Link>
                </li>
              </div>
              <div className="nav-items-second-div">
                <li>
                  <Link onClick={() => props.signoutHandler()}>SignOut</Link>
                </li>
              </div>
            </ul>
          </nav>
        </>
      </div>
    );
}

export default Navigationbar;
