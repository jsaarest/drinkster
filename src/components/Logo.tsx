import React from 'react'
import drinksterLogo from '../assets/drinkster-logotype.svg'

const Logo = React.memo(() => {
  return (
    <div className="logo">
      <a href="/">
      <img src={drinksterLogo} alt="drinkster-logo" height={25} draggable={false} />
      </a>
    </div>
    
  );
});

export default Logo;