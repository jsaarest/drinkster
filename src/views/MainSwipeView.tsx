import React, { useEffect } from 'react'
import '../App.css'
import { Cocktail, SwipeType, HistoryType } from '../types'
import LikeButton from '../components/LikeButton'
import SkipButton from '../components/SkipButton'
import { getDrinks } from '../lib/api/drinks'
import NoInternetConnection from '../components/NoInternetConnection'
import { AnimatePresence } from 'framer-motion'
import SwipeCard from '../components/SwipeCard'


const MainSwipeView = () => {
  const [drinksList, setDrinksList] = React.useState<Cocktail[]>([])
  const [limit, setLimit] = React.useState(5)
  const activeIndex = drinksList.length - 1
  const [history, setHistory] = React.useState<HistoryType[]>([]);
  const [error, setError] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    getDrinks(limit).then(
      (result) => setDrinksList(result)
    )
  }, [])

  const removeCard = async (oldDrink: Cocktail, swipe: SwipeType) => {
    setModalOpen(false)
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
      <div className='container'>
        <div className="card-container">
          {error ? <NoInternetConnection /> : null}

          <AnimatePresence>
            {drinksList && drinksList.length > 0 ?
              drinksList.map((drink: Cocktail, index: number) => {
                return <SwipeCard
                  key={drink.idDrink}
                  active={index === activeIndex}
                  modalOpen={modalOpen}
                  removeCard={removeCard}
                  onSwipeRight={() => setModalOpen(true)}
                  drink={drink}

                />
              })
              : null
            }
          </AnimatePresence>
        </div>

      </div>
      <div className="button-row">
        <SkipButton onClick={() => {
          removeCard(drinksList[activeIndex], "nope")
        }
        } />
        <LikeButton onClick={() => {
          setModalOpen(!modalOpen)
        }} />
      </div>
    </>

  )

}

export default MainSwipeView