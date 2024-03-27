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
            <div className="history-content">
            <h2>History:</h2>
                <button className="clear-button" onClick={clearHistory}>Clear History</button>
            <ul className="history-list">
                {history.map((item, index) => (
                <li key={index} className="history-item">{item}</li>
                ))}
            </ul>
            </div>
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
