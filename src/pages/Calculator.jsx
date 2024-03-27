import { useEffect, useReducer, useState, useContext } from "react";
import Header from "../compenents/Header";
import DigitButton from "../compenents/DigitButton";
import OperationButton from "../compenents/OperationButton";
import History from "./History";
import { connect } from 'react-redux';
import { addToHistory, clearHistory } from "../actions";
import { HistoryContext } from "../HistoryContext";


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}



function reducer(state, { type, payload }) {

    

    switch(type) {
        case ACTIONS.ADD_DIGIT:
            //add to the history list
            payload.history(payload.digit);
            if (state.overwrite) {
                return {
                    ...state,
                    currOperand: payload.digit,
                    overwrite: false,
                }
            }
            if (payload.digit === "0" && state.currOperand === "0") 
                return state
            if (payload.digit === "." && state.currOperand.includes(".")) 
                return state
            return {
                ...state,
                currOperand: `${state.currOperand || ""}${payload.digit}`,
            }
        case ACTIONS.CHOOSE_OPERATION:
            //add to history list
            payload.history(payload.operation);
            if (state.currOperand == null && state.prevOperand == null)
                return state

            if (state.currOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            if (state.prevOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    prevOperand: state.currOperand,
                    currOperand: null,
                }
            }

            return {
                ...state,
                prevOperand: evaluate(state),
                operation: payload.operation,
                currOperand: null
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currOperand: null
                }
            }
            if (state.currOperand == null) return state
            if (state.currOperand.length === 1) {
                return {
                    ...state,
                    currOperand: null
                }
            }
            return {
                ...state,
                currOperand: state.currOperand.slice(0, -1)
            }

        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currOperand == null || state.prevOperand == null) {
                return state;
            }
            return {
                ...state, 
                overwrite: true,
                prevOperand: null,
                operation: null,
                currOperand: evaluate(state)
            }
    }
}

function evaluate({ currOperand, prevOperand, operation }) {
    const prev = parseFloat(prevOperand)
    const curr = parseFloat(currOperand)
    if (isNaN(prev) || isNaN(curr)) 
        return ""

    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + curr
            break
        case "-":
            computation = prev - curr
            break
        case "*":
            computation = prev * curr
            break
        case "÷":
            computation = prev / curr
            break
    }

    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) {
        return INTEGER_FORMATTER.format(integer)
    }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const Calculator = () => {
    const [{ currOperand, prevOperand, operation}, dispatch] = useReducer(reducer, {});
    const { history, addToHistory, clearHistory } = useContext(HistoryContext);

    // const [history, setHistory] = useState([]);

    // useEffect(() => {
    //     console.log("dddddddddddddddddd");
    //     }, [history])

    // Function to add clicked button to history
    // const addToHistory = (button) => {
    //     // Limit history to 20 items
    //     const updatedHistory = [button, ...history.slice(0, 19)];
    //     setHistory(updatedHistory);
    // };

    // const clearHistory = () => {
    //     setHistory([]);
    // };

    

    return (
        <div>
            <Header />
            <div className="calc-grid">
                <div className="output">
                    <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
                    <div className="curr-operand">{formatOperand(currOperand)}</div>
                </div>
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
                AC
                </button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
                DEL</button>
            <OperationButton operation="÷" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="1" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="2" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="3" history={addToHistory} dispatch={dispatch} />
            <OperationButton operation="*" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="4" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="5" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="6" history={addToHistory} dispatch={dispatch} />
            <OperationButton operation="+" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="7" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="8" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="9" history={addToHistory} dispatch={dispatch} />
            <OperationButton operation="-" history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="." history={addToHistory} dispatch={dispatch} />
            <DigitButton digit="0" history={addToHistory} dispatch={dispatch} />
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>

            {/* <div> */}
            {/* <History history={history} clearHistory={clearHistory} /> */}
            {/* </div> */}
            {/* <div>
            <ul>
                {history.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
            </div> */}




        </div>
    )
}

const mapStateToProps = (state) => ({
    history: state.history,
  });

const mapDispatchToProps = {
  addToHistory,
  clearHistory,
};

export default Calculator;
