import type { Cocktail } from "../../types"

export const getDrinks = async (limit: number): Promise<Cocktail[]> => {

    const array = [] as Cocktail[]
    for(let i = 0; i < limit; i++) {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php/')
        const data = await res.json()
        if(data.drinks.length > 0) array.push(data.drinks[0] as Cocktail)
    }
    return array
}
