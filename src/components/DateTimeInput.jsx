export default function DateTimeInput({label, isEnable, value}) {
    return (
        <section>
            <label htmlFor={label}>{label}</label><br/>
            <input type="date" id={label} disabled={isEnable ? "" : "disabled"} value={value} />
        </section>
    )
}