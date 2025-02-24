import { useContext, useState } from "react";
import Input from "./Input";
import ButtonWithCheckbox from "./ButtonWithCheckbox";
import { StrategyContext } from "../pages/Config";
import { toCamelCase } from "../utils";

export default function StrategyConfig(props) {
    const [isSelected, setSelected] = useState(false);

    const dispatch = useContext(StrategyContext);
    const configValues = {};

    const inputs = [];

    for (const [key, value] of Object.entries(props.params)) {
        inputs.push(
            <Input
                label={key}
                key={key}
                type="number"
                parent={props.name}
                defaultValue={value.defaultValue}
            />
        );
        configValues[toCamelCase(key)] = value.defaultValue;
    }

    function handleClick() {
        setSelected((selected) => !selected);
        dispatch({
            type: "selected",
            strategyId: props.name,
            values: configValues
        });
    }

    function renderConfig() {
        if (isSelected && inputs.length > 0) {
            return <section className="config">{inputs}</section>;
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
