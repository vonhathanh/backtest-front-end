import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function StrategyConfig(props) {

    const [isSelected, setSelected] = useState(false)

    const inputs = []

    for (const [key, value] of Object.entries(props.params)) {
        inputs.push(<Input label={key} key={key} isEnable={true}/>)
    }

    function handleClick() {
        setSelected(oldSelected => !oldSelected)
    }

    function renderConfig() {
        if (isSelected && inputs.length > 0 ) {
            return (
                <>
                {inputs}
                <button>Save Configuration</button>
                </>
            )
        }
    }

    return (
        <section>
            <Button name={props.name} onClick={handleClick} isSelected={isSelected}/>
            {renderConfig()}
        </section>
    )
}