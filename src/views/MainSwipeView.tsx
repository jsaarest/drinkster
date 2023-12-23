import React, { useMemo, useRef } from 'react'
import '../App.css'

import { useQuery } from 'react-query'
import TinderCard from 'react-tinder-card'
import { Cocktail, TinderSwipeCardDirections } from '../types'
import FullDataCard from '../components/FullDataCard'
import IngredientsList from '../components/IngredientsList'
import LikeButton from '../components/LikeButton'
import SkipButton from '../components/SkipButton'
import { getDrinks } from '../lib/api/drinks'


const MainSwipeView = () => {
  const [fullData, setFullData] = React.useState(false)
  const [drinksList, setDrinksList] = React.useState<Cocktail[]>([])
  const [index, setIndex] = React.useState(4)
  const [limit, setLimit] = React.useState(5)

  // used for outOfFrame closure
  const currentIndexRef = useRef(index) as React.MutableRefObject<number>

  const childRefs = useMemo(
    () =>
      Array(drinksList.length)
        .fill(0)
        .map((i) => React.createRef() as React.MutableRefObject<any>),
    [drinksList.length]
  )

  const canSwipe = index >= 0


  const { data: drinks, isLoading, refetch } = useQuery<Cocktail[]>('drinks', async () => {
    const drinks = await getDrinks(limit)
    setDrinksList(drinks)
    return drinks
  })

  const updateCurrentIndex = (index: number) => {
    setIndex(index)
    currentIndexRef.current = index
  }

  const getNextDrink = (currentIndex: number) => {
    setFullData(false)
    if(isLoading){
      console.log("loading")
      return false;
    };
    console.log("Current index: ", currentIndex, "drink", drinksList[currentIndex].strDrink, drinksList.map(x => x.strDrink))
    if (currentIndex === 1) {
      refetch()
        .then(result => {
          if (!result.data) return;
          console.log("refetched new data")
          const curr = [...drinksList.splice(0, 1)]
          console.log("current drinklist", curr)

          const newArr = [...curr, ...result.data]
          console.log("new drinklist", newArr)
          setDrinksList(newArr)
          updateCurrentIndex(5)
        })
    }
  }

  const swipe = async (dir: TinderSwipeCardDirections) => {
    if(isLoading){
      console.log("swipe: loading")
      return false;
    };
    if (canSwipe && index < drinksList.length) {
      await childRefs[index].current.swipe(dir)
      const newIndex = index - 1
      updateCurrentIndex(newIndex)
      onSwipe(dir, newIndex)
    }
  }

  const onSwipe = (direction: TinderSwipeCardDirections, currentIndex: number) => {
    if (direction === "left") {
      console.log("Swiped left")
      return getNextDrink(currentIndex)
    };
    if (direction === "right") {
      console.log("Swiped right")
      return setFullData(true)
    }
  }

  return (
    <>
      <div className='container'>
        <div className="card-container">
        {(drinksList && drinksList.length > 0 && !isLoading) ?
            drinksList.map((drink: Cocktail, index: number) => {
              return <TinderCard
                ref={childRefs[index]}
                key={drink.idDrink}
                className='swipe'
                onCardLeftScreen={() => getNextDrink(index)}
                onSwipe={(dir: TinderSwipeCardDirections) => onSwipe(dir, index)}
              >
                <div className="card" key={drink.idDrink}>
                  <img
                    src={drink.strDrinkThumb}
                    className='card-image'
                    draggable={false}
                  />
                  <div className="text-area">
                    <div className="tag-line">
                      {fullData && <IngredientsList ingredients={[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4]} />}
                    </div>

                    <h2>{drink.strDrink}</h2>
                    <div className="scrollabe-text">
                    <p>
                      {drink.strInstructions}
                    </p>
                      </div>

                    {fullData && <FullDataCard {...drink} />}
                  </div>
                </div>
              </TinderCard>
            })

            : null}
        </div>
      
         
     




      </div>
      <div className="button-row">
        <SkipButton onClick={() => swipe("left")} />
        <LikeButton onClick={() => setFullData(true)} />
      </div>
    </>

  )

}

export default MainSwipeView