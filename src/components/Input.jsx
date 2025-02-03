export default function Input({label, isEnable, value}) {
    return (
        <section>
            <label htmlFor={label}>{label}</label><br/>
            <input type="text" id={label} disabled={isEnable ? "" : "disabled"} value={value} />
        </section>
    )
}