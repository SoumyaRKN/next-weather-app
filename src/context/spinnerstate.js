import { useState } from "react";
import SpinnerContext from "./spinnercontext";

const SpinnerState = (props) => {
    const [isSpinner, setisSpinner] = useState(true);

    return (
        <SpinnerContext.Provider value={{ isSpinner, setisSpinner }}>
            {props.children}
        </SpinnerContext.Provider>
    );
}

export default SpinnerState;