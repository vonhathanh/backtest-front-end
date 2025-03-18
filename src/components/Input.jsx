import { useContext } from "react";
import { StrategyContext } from "../pages/Config";
import { toCamelCase } from "../utils";

export default function Input({ label, value, type, parent, defaultValue }) {
  const dispatch = useContext(StrategyContext);

  // smaller font size for label in StrategyConfig
  const style = parent ? { fontSize: "0.875rem" } : { fontSize: "1rem" };

  return (
    <section>
      <span className="bold" style={style}>
        {label}
      </span>
      <br />
      <input
        type={type}
        name={label}
        value={value}
        defaultValue={defaultValue ? defaultValue : undefined}
        required
        onChange={
          parent
            ? (event) =>
                dispatch({
                  type: "updated",
                  strategyId: parent,
                  name: toCamelCase(label),
                  value: type === "number" ? Number(event.target.value) : event.target.value,
                })
            : undefined
        }
      />
    </section>
  );
}
