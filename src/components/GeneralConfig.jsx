import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ManualMode from "./ManualMode";

export default function GeneralConfig({ configData }) {
    return (
        <section className="config-group">
            <Input
                label="Symbol"
                isEnable={false}
                value={configData ? configData.symbol : ""}
            />
            <Input
                label="Timeframe"
                isEnable={false}
                value={configData ? configData.tf : ""}
            />
            <DateTimeInput
                label="Start time"
                config={configData}
            />
            <DateTimeInput
                label="End time"
                config={configData}
            />
            <Input label="Initial Balance" isEnable={true} />
            <ManualMode />
        </section>
    );
}
