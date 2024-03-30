import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import AuthContext from '../contextes/AuthContext';
import { useContext } from 'react';
import { HistoryContext } from '../contextes/HistoryContext';

export default function Header() {
    const navigate = useNavigate();
    const { username }  = useContext(AuthContext);
    const { clearHistory } = useContext(HistoryContext);
    
    const handleClick = () => {
        localStorage.removeItem('calculatorState');
        clearHistory();
        navigate("/login");
    }

    return <nav className="nav">
        <div className="nav-left">
        <ul className="nav-links">
            <CustomLink to={"/calculator"}>Calculator</CustomLink>
            <CustomLink to={"/history"}>History</CustomLink>
        </ul>
        </div>

        <div className="nav-right">
        <div className="user-greeting">
        <h2 className='hello'>Hello {username}</h2>

        <button className="logout-button" type="button" onClick={handleClick}>Logout</button>         
        </div>
        </div>
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