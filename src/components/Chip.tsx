import '../App.css'
const Chip = ( {label}: {label: string} ) => {
    return(
        <div className="chip">
            <p className="chip-label">{label}</p>
        </div>
    )
}

export default Chip