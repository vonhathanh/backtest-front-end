import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ManualMode from "./ManualMode";
import Label from "./Label";

export default function GeneralConfig({ configData, onChange }) {
    return (
        <section className="config-group">
            <Label text="Symbol" value={configData ? configData.symbol : ""} />
            <Label text="Timeframe" value={configData ? configData.tf : ""} />

            <DateTimeInput
                label="Start time"
                config={configData}
                onChange={onChange}
            />
            <DateTimeInput
                label="End time"
                config={configData}
                onChange={onChange}
            />

            <Input label="Initial Balance" isEnable={true} type="number" />

            <ManualMode />
        </section>
    );
}
