import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ManualMode from "./ManualMode";
import Label from "./Label";

export default function GeneralConfig({ metadata, onChange, startTime, endTime }) {
    return (
        <section className="config-group">
            <Label text="Symbol" value={metadata?.symbol || ""} />
            <Label text="Timeframe" value={metadata?.tf || ""} />

            <DateTimeInput
                label="Start time"
                config={metadata}
                onChange={onChange}
                value={startTime}
            />
            <DateTimeInput
                label="End time"
                config={metadata}
                onChange={onChange}
                value={endTime}
            />

            <Input label="Initial Balance" type="number" />

            <ManualMode />
        </section>
    );
}
