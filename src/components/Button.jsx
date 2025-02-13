export default function Button(props) {
    
    const style = props.isSelected ? { backgroundColor: "black", color: "white" } : {}

    return (
        <button type="button" className="max-width-btn" style={style} onClick={props.onClick}>{props.text}</button>
    )
}