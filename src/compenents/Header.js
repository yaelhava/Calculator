import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { clearHistory } from "../actions";
import { HistoryContext } from '../HistoryContext';

export default function Header() {
    const navigate = useNavigate();
    const { username }  = useContext(AuthContext);
    const { history, clearHistory } = useContext(HistoryContext);
    
    const handleClick = () => {
        localStorage.removeItem('calculatorState');
        clearHistory();
        navigate("/login");
    }

    return <nav className="nav">
        <div className="nav-left">
        <h1 className="nav-title">Calculator App</h1>
        <ul className="nav-links">
            <CustomLink to={"/calculator"}>Calculator</CustomLink>
            <CustomLink to={"/history"}>History</CustomLink>
        </ul>
        </div>

        <div className="nav-right">
        <h2 className='hello'>Hello {username}</h2>

        <button className="logout-button" type="button" onClick={handleClick}>Logout</button>         
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