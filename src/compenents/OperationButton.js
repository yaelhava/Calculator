import { ACTIONS } from "../pages/Calculator"

export default function OperationButton( {dispatch, operation, history}) {
    return (<button onClick={() => 
                dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation, history } })}>
                    {operation}
            </button>
    )
}