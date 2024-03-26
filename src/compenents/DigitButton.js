import { ACTIONS } from "../pages/Calculator"

export default function DigitButton( {dispatch, digit, history}) {
    return (<button onClick={() => 
                dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit, history } })}>
                    {digit}
            </button>
    )
}