import React, { Ref, useMemo, useRef } from 'react'
import '../App.css'

import { useQuery } from 'react-query'
import TinderCard from 'react-tinder-card'
import { Cocktail, SwipeType, HistoryType } from '../types'
import FullDataCard from '../components/FullDataCard'
import IngredientsList from '../components/IngredientsList'
import LikeButton from '../components/LikeButton'
import SkipButton from '../components/SkipButton'
import { getDrinks } from '../lib/api/drinks'
import NoInternetConnection from '../components/NoInternetConnection'
import { AnimatePresence } from 'framer-motion'
import SwipeCard from '../components/SwipeCard'
import FullDataModal from '../components/FullDataModal'


const MainSwipeView = () => {
  const [fullData, setFullData] = React.useState(false)
  const [drinksList, setDrinksList] = React.useState<Cocktail[]>([])
  const [limit, setLimit] = React.useState(5)
  const activeIndex = drinksList.length - 1
  const [history, setHistory] = React.useState<HistoryType[]>([]);
  const [error, setError] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState<Cocktail | null>(null);

  React.useEffect(() => {
    getDrinks(limit).then(
      (result) => setDrinksList(result)
    )
  }, [])

  const removeCard = async (oldDrink: Cocktail, swipe: SwipeType) => {
    if (drinksList.length <= 1) {
      return getDrinks(limit)
        .then(result => {
          if (!result) return setError("Could not fetch drinks");
          setDrinksList((current) => {
            const arr = [...result, ...current];
            return arr
          })
        })
    }
    setHistory((current) => [...current, { ...oldDrink, swipe }]);
    setDrinksList((current) =>
      current.filter((drink) => {
        return drink.idDrink !== oldDrink.idDrink;
      })
    );
  };

  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.idDrink !== newCard.idDrink;
        })
      );

      setDrinksList((current) => [...current, newCard]);
    }
  };


  return (
    <>
       {modalOpen && <FullDataModal className={`modal-container ${modalOpen ? 'show' : ''}`} onClose={() => setModalOpen(null)} drink={modalOpen!}/>}
      <div className='container'>
        <div className="card-container">
          {error ? <NoInternetConnection /> : null}
       
          <AnimatePresence>
            {(drinksList && drinksList.length > 0) ?
              drinksList.map((drink: Cocktail, index: number) => {
                return <SwipeCard
                  key={drink.idDrink}
                  active={index === activeIndex}
                  removeCard={removeCard}
                  onSwipeRight={() => setModalOpen(drinksList[index])}
                  card={drink}

                >
                  <div className="card" key={drink.idDrink}>
                    <img
                      src={drink.strDrinkThumb}
                      className='card-image'
                      draggable={false}
                    />
                    <div className="text-area">
                      <p className="overline">{drink.strGlass}</p>
                      <div className="tag-line">
                        {fullData && <IngredientsList ingredients={[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4]} />}
                      </div>

                      <h2>{drink.strDrink}</h2>
                      <div className="scrollable-text">
                        <p>
                          {drink.strInstructions}
                        </p>
                        <div className="scrollable-text-shadow" />
                      </div>
                      {fullData && <FullDataCard {...drink} />}
                    </div>
                  </div>
                </SwipeCard>
              })

              : null}
          </AnimatePresence>
        </div>

      </div>
      <div className="button-row">
        <SkipButton onClick={() => removeCard(drinksList[activeIndex], "nope")} />
        <LikeButton onClick={() => setModalOpen(drinksList[activeIndex])} />
      </div>
    </>

  )

}

export default MainSwipeView