import { useEffect, useReducer, useContext } from "react";
import Header from "../compenents/Header";
import DigitButton from "../compenents/DigitButton";
import OperationButton from "../compenents/OperationButton";
import { HistoryContext } from "../contextes/HistoryContext";
import MinusButton from "../compenents/MinusButton";


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
    RESTORE_STATE: 'restore-state'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.operation != null) {
                payload.history(payload.operation);
            }
            else {
                payload.history(payload.digit);
            }
            if (state.overwrite) {
                return {
                    ...state,
                    currOperand: payload.digit,
                    overwrite: false,
                }
            }
            if (payload.isMinus) {
                return {
                    ...state,
                    isMinus: true,
                    currOperand: "-"
                }
            }
            if (payload.digit === "0" && state.currOperand === "0") {
                alert("illegal operation");
                return state
            }
            if (payload.digit === "." && (state.currOperand == null || state.currOperand.includes(".")))
                return state

            return {
                ...state,
                currOperand: `${state.currOperand || ""}${payload.digit}`,
            }
        case ACTIONS.CHOOSE_OPERATION:
            payload.history(payload.operation);
            if (state.currOperand == null && state.prevOperand == null) {
                return state
            }
            if (state.currOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            if (state.currOperand === "-") {
                return state
            }
            if (state.prevOperand == null) {
                return {
                    ...state,
                    overwrite: false,
                    operation: payload.operation,
                    prevOperand: state.currOperand,
                    currOperand: null,
                }
            }

            return {
                ...state,
                prevOperand: evaluate(state),
                operation: payload.operation,
                isMinus: false,
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
        case ACTIONS.RESTORE_STATE:
            return {
                ...state,
                currOperand: payload.currOperand ?? state.currOperand,
                prevOperand: payload.prevOperand ?? state.prevOperand,
                operation: payload.operation ?? state.operation
            }
        default:
            break;
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
        default:
            break;
    }

    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

function formatOperand(operand) {
    if (operand === "-") return "-"
    if (operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) {
        return INTEGER_FORMATTER.format(integer)
    }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const Calculator = () => {
    const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {});
    const { addToHistory } = useContext(HistoryContext);

    useEffect(() => {
        const savedState = localStorage.getItem("calculatorState");
        if (savedState) {
            const { currOperand, prevOperand, operation } = JSON.parse(savedState);

            dispatch({ type: ACTIONS.RESTORE_STATE, payload: { currOperand, prevOperand, operation } });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("calculatorState", JSON.stringify({ currOperand, prevOperand, operation }));
    }, [currOperand, prevOperand, operation]);

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
                <MinusButton operation="-" history={addToHistory} currOperand={currOperand} dispatch={dispatch} />
                {/* <OperationButton operation="-" history={addToHistory} dispatch={dispatch} /> */}
                <DigitButton digit="." history={addToHistory} dispatch={dispatch} />
                <DigitButton digit="0" history={addToHistory} dispatch={dispatch} />
                <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>
        </div>
    )
}


export default Calculator;
