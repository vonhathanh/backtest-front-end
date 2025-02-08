import Input from "./Input";
import DateTimeInput from "./DateTimeInput"
import ManualMode from "./ManualMode";

export default function GeneralConfig() {
    return (
        <section className="config-group">
            <Input label="Symbol" isEnable={false} />
            <Input label="Timeframe" isEnable={false} />
            <DateTimeInput label="Start time" isEnable={false} />
            <DateTimeInput label="End time" isEnable={false} />
            <Input label="Initial Balance" isEnable={true} />
            <ManualMode />
        </section>
    )
}