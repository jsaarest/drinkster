import Chip from "./Chip"

const IngredientsList = ({ ingredients }: { ingredients: string[] }) => {
    const renderIngredients = () => ingredients.filter(x => !!x).map((ingredient: string, index: number) => {
            return <Chip key={index} label={ingredient} />
        }
    )
    return <>{renderIngredients()}</>
}

export default IngredientsList