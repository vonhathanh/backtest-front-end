export default function Button(props) {
    
    const style = props.isSelected ? { backgroundColor: "black", color: "white" } : {}

    return (
        <>
            <button className="max-width-btn" style={style} onClick={props.onClick}>{props.text}</button>
        </>
    )
}