import Input from "./Input";

export default function DefaultConfig() {
    return (
        <section className="config-group">
            <Input label="Symbol" isEnable={false} />
            <Input label="Timeframe" isEnable={false} />
        </section>
    )
}