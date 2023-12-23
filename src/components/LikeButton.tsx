import '../App.css'
import { getIcon } from '../assets/icons/icons'

const LikeButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return(
        <button className="round-button" onClick={onClick}>
            <div className="round-button-icon">{getIcon("heart")}</div>
        </button>
    )
}

export default LikeButton