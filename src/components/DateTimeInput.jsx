export default function DateTimeInput({label, isEnable, value}) {
    return (
        <section>
            <label htmlFor={label}>{label}</label><br/>
            <input type="date" disabled={isEnable ? "" : "disabled"} value={value} />
        </section>
    )
}