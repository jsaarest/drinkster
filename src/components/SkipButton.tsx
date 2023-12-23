import '../App.css'
import { getIcon } from '../assets/icons/icons'

const SkipButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return(
        <button className="round-button" onClick={onClick}>
            <div className="round-button-icon">{getIcon("cross")}</div>
        </button>
    )
}

export default SkipButton