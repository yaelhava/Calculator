import React, { useContext } from 'react';
import Header from "../compenents/Header";
import { connect } from 'react-redux';
import { clearHistory } from "../actions";
import { HistoryContext } from '../HistoryContext';

const History = () => {
    // const history = props.history;
    
    const { history, clearHistory } = useContext(HistoryContext);

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


export default History;
