export default function DateTimeInput({ label, config }) {
    function render() {
        if (config) {
            return (
                <input
                    type="date"
                    disabled=""
                    value={label.includes("Start") ? config.start_time : config.end_time}
                    min={config.start_time}
                    max={config.end_time}
                />
            )
        } else {
            return (
                <input
                    type="date"
                    disabled="disabled"
                    value=""
                />
            )
        }
    }

    return (
        <section>
            <label htmlFor={label}>{label}</label><br />
            {render()}
        </section>
    )
}