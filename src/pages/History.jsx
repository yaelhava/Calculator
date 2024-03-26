import Header from "../compenents/Header";


const History = (history, clearHistory) => {
    
    return (
        <div>
            <Header />
            <h2>History:</h2>
            <ul>
                {history.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
      <button onClick={clearHistory}>Clear History</button>
        </div>
    )
}


export default History;