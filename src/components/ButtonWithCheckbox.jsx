export default function ButtonWithCheckbox(props) {
    
    const style = props.isSelected ? { backgroundColor: "black", color: "white" } : {}

    return (
        <>
            <button className="max-width-btn flex" style={style} onClick={props.onClick}>
                {props.text}
                {props.isSelected && <i className="fa-solid fa-check checked-icon"></i>}
            </button>
        </>
    )
}