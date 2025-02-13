export default function Input({label, value, type}) {
    return (
        <section>
            <label htmlFor={label}>{label}</label><br/>
            <input type={type} name={label} value={value} />
        </section>
    )
}