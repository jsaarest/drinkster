import { Cocktail } from "../types"

const FullDataCard = (drink: Cocktail) => {
    return(
        <div style={{margin: '10px 0px',paddingTop: '10px', borderTop:'solid 0.5px lightgrey', display:'flex', justifyContent:'space-between'}}>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient1 &&
                    <p>
                      {drink.strIngredient1}
                    </p>}
                    <p>
                      {drink.strMeasure1}
                    </p>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient2 &&
                    <p>
                      {drink.strIngredient2}
                    </p>}
                    <p>
                      {drink.strMeasure2}
                    </p>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient3 &&
                    <p>
                      {drink.strIngredient3}
                    </p>}
                    <p>
                      {drink.strMeasure3}
                    </p>
                  </div>
                  <div style={{marginRight: '15px'}}>
                    {drink.strIngredient4 &&
                    <p>
                      {drink.strIngredient4}
                    </p>}
                    <p>
                      {drink.strMeasure4}
                    </p>
                  </div>
                </div>
    )
}

export default FullDataCard