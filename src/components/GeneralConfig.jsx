import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ManualMode from "./ManualMode";
import { useState } from "react";

export default function GeneralConfig({ metadata }) {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const symbol = metadata? `: ${metadata.symbol}`: ""
    const timeframe = metadata? `: ${metadata.tf}`: ""

    return (
        <section className="config-group">
            <label>Symbol{symbol} </label>
            <label>Timeframe{timeframe}</label>

            <DateTimeInput
                label="Start time"
                config={metadata}
                onChange={(value) => setStartTime(value)}
                value={startTime}
            />
            <DateTimeInput
                label="End time"
                config={metadata}
                onChange={(value) => setEndTime(value)}
                value={endTime}
            />

            <Input label="Initial Balance" type="number" defaultValue={100000} />

            <ManualMode />
        </section>
    );
}
