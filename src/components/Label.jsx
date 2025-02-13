export default function Label({ text, value }) {
    return (
        <>
            <label>{text}{value ? `: ${value}` : ""}</label>
        </>
    )
}