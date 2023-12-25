import { getIcon } from "../assets/icons/icons"

const NoInternetConnection = () => {
  return(
    <div className="vertical-container">
      <div>{getIcon("wifi-slash")}</div>
      <h2>No internet connection</h2>
      <p>You can play Drinkster again when you are connected to the Internet</p>
    </div>
  )
}

export default NoInternetConnection;