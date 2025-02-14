import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ManualMode from "./ManualMode";
import Label from "./Label";
import { useState } from "react";

export default function GeneralConfig({ metadata }) {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    return (
        <section className="config-group">
            <Label text="Symbol" value={metadata?.symbol || ""} />
            <Label text="Timeframe" value={metadata?.tf || ""} />

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

            <Input label="Initial Balance" type="number" />

            <ManualMode />
        </section>
    );
}
