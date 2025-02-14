export default function DateTimeInput({ label, config, onChange, value }) {
    function getValue() {
        if (!config) return ""
        if (value) return value
        return label.includes("Start") ? config.start_time : config.end_time
    }

    return (
        <section>
            <label htmlFor={label}>{label}</label><br />
            <input
                type="date"
                disabled={config ? "" : "disabled"}
                name={label}
                value={getValue()}
                min={config?.start_time || ""}
                max={config?.end_time || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </section>
    )
}