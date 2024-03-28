import { ACTIONS } from "../pages/Calculator"

export default function MinusButton({ dispatch, operation, currOperand, isMinus, history }) {

    if (currOperand == null) {
        console.log(operation);
        return (<button onClick={() =>
            dispatch({ type: ACTIONS.ADD_DIGIT, payload: { operation, history, isMinus: true } })}>
            {operation}
        </button>
        )
    }

    return (<button onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation, history } })}>
        {operation}
    </button>
    )
}