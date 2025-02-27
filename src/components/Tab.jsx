export default function Tab({currentTab, name, onClick, value}) {
    const style = {
        backgroundColor: currentTab === name ? "#ccc" : "white"
    }
    return (
        <button style={style} className="tab" onClick={() => onClick(name)}>{value}</button>
    )
}