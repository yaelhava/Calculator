import Header from "../compenents/Header";
import { connect } from 'react-redux';
import { clearHistory } from "../actions";

const History = ({history, clearHistory}) => {
    // const history = props.history;
    
    return (
        <div>
            <Header />
            <h2>History:</h2>
                <button onClick={clearHistory}>Clear History</button>
            <ul>
                {history.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    history: state.history,
  });

  
const mapDispatchToProps = {
  clearHistory,
};


export default connect(mapStateToProps, mapDispatchToProps)(History);
