import { Cocktail } from "../types"

type FullDataCardProps = {
  drink: Cocktail;
  className?: string;
}
const FullDataCard = ({ drink, className }: FullDataCardProps) => {

  const ingredients = [
    {label: drink?.strIngredient1, value: drink?.strMeasure1},
    {label: drink?.strIngredient2, value: drink?.strMeasure2},
    {label: drink?.strIngredient3, value: drink?.strMeasure3},
    {label: drink?.strIngredient4, value: drink?.strMeasure4},
    {label: drink?.strIngredient5, value: drink?.strMeasure5},
  ]
  return (
    <div className={className}>
      <ul>
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient.label} - {ingredient.value}</li>
        })}
      </ul>
      
    </div>

  )
}

export default FullDataCard