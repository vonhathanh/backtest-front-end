export default function Input({label, isEnable, value, type}) {
    return (
        <section>
            <label htmlFor={label}>{label}</label><br/>
            <input type={type} name={label} disabled={isEnable ? "" : "disabled"} value={value} />
        </section>
    )
}