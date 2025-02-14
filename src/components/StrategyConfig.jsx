import { useContext, useState } from "react";
import Input from "./Input";
import ButtonWithCheckbox from "./ButtonWithCheckbox";
import Button from "./Button";
import { StrategyContext } from "../pages/Config";

export default function StrategyConfig(props) {
    const [isSelected, setSelected] = useState(false);

    const dispatch = useContext(StrategyContext)

    const inputs = [];

    for (const [key, value] of Object.entries(props.params)) {
        inputs.push(<Input label={key} key={key} type="number" parent={props.name}/>);
    }

    function handleClick() {
        setSelected((oldSelected) => !oldSelected);
        dispatch({
            type: "selected",
            id: props.name
        })
    }

    function handleSave() {}

    function renderConfig() {
        if (isSelected && inputs.length > 0) {
            return (
                <>
                    <section className="config">{inputs}</section>
                    <Button text={"Clear Configuration"} onClick={handleSave} />
                </>
            );
        }
    }

    return (
        <section>
            <ButtonWithCheckbox
                text={props.name}
                onClick={handleClick}
                isSelected={isSelected}
            />
            {renderConfig()}
        </section>
    );
}
