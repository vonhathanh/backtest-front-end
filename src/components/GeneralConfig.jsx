import Input from "./Input";
import DateTimeInput from "./DateTimeInput";
import ToogleButtonWithLabel from "./ToogleButtonWithLabel";
import { useState } from "react";

export default function GeneralConfig({ metadata }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const symbol = metadata ? `: ${metadata.symbol}` : "";
  const timeframe = metadata ? `: ${metadata.tf}` : "";

  return (
    <section className="config-group">
      <span className="bold">Symbol{symbol} </span>
      <span className="bold">Timeframe{timeframe}</span>

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

      <Input label="Delay Between Candles" type="number" defaultValue="0" />

      <ToogleButtonWithLabel label="Live Update" name="live-updates" />
      <ToogleButtonWithLabel label="Step by Step" name="step-by-step" />
    </section>
  );
}
