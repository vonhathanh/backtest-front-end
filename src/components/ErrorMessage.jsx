export default function ErrorMessage({message}) {
    return (
        <section className="error">
            <i className="fa-solid fa-circle-exclamation icon"></i>
            <span>{message}</span>
        </section>
    )
}