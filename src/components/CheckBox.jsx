export default function CheckBox({ name }) {
    return (
        <div className="checkbox">
            <input type="checkbox" id={name} name={name} value={name} />
            <label htmlFor={name}>{name}</label>
        </div>
    )
}