import DateTimeInput from "./DateTimeInput"

export default function TimeConfig() {
    return (
        <section className="config-group">
            <DateTimeInput label="Start time" isEnable={false} />
            <DateTimeInput label="End time" isEnable={false} />
        </section>
    )
}