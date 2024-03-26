import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { useContext } from 'react';

export default function Header() {
    const navigate = useNavigate();
    // const location = useLocation();
    // const { state } = location;
    const { username }  = useContext(AuthContext);

    const handleClick = () => {
        // should also clean history....
        navigate("/login");
    }

    return <nav className="nav">
        <ul>
            <CustomLink to={"/calculator"}>Calculator</CustomLink>
            <CustomLink to={"/history"}>History</CustomLink>
        </ul>

        <h2 className='hello'>Hello {username}</h2>

        <button type="button" onClick={handleClick}>Logout</button>         
        
    </nav>
}


function CustomLink({ to, children, ...props}) {
    const resolvedPath =  useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end:true});

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}