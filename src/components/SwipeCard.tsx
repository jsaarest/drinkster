import { PanInfo, motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Cocktail, SwipeType } from "../types";
import FullDataCard from "./FullDataCard";
import Chip from "./Chip";

export type SwipeCardProps = {
  drink: Cocktail;
  removeCard: (oldCard: Cocktail, swipe: SwipeType) => void;
  active: boolean;
  onSwipeRight: () => void;
  modalOpen: boolean;
}

const CardContent = ({ drink }: { drink: Cocktail }) => (
  <div className="card" key={drink.idDrink}>
    <img
      src={drink.strDrinkThumb}
      className='card-image'
      draggable={false}
    />
    <div className="text-area">
      <div className="horizontal-container" style={{ justifyContent: "space-between", paddingBottom: "0.5rem" }}>
        <h2>{drink.strDrink}</h2>
        <Chip label={drink.strCategory} />
      </div>
      <div className="scrollable-text">
        <p>
          {drink.strInstructions}
        </p>
        <div className="scrollable-text-shadow" />
      </div>
    </div>
  </div>
)

const CardFlippedContent = ({ drink }: { drink: Cocktail }) => (
  <div className="card" key={drink.idDrink} style={{
    transform: "rotateY(-180deg)"
  }}>
    <div className="vertical-container" style={{
      alignItems: "flex-start",
      padding: "2rem",
      textAlign: "left"
    }}>

    <div className="horizontal-container align-left" style={{ justifyContent: "space-between" }}>
      <h2>{drink.strDrink}</h2>
      <Chip label={drink.strCategory} />
      </div>

      <FullDataCard drink={drink} />
      <div className="scrollable-text">
        <p>
          {drink.strInstructions}
        </p>
        <div className="scrollable-text-shadow" />
      </div>
    </div>
  </div>
)

const SwipeCard = ({ drink, removeCard, active, onSwipeRight, modalOpen }: SwipeCardProps) => {
  const [leaveX, setLeaveX] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      // swipe right
      setLeaveX(1000);
      flipCard();
      setIsFlipped(!isFlipped);
    }
    if (info.offset.x < -100) {
      // swipe left
      setLeaveX(-1000);
      removeCard(drink, "nope");
      setIsFlipped(false);

    }
  };
  const flipCard = async () => {
    await controls.start({
      rotateY: isFlipped ? 0 : 180,
      transition: { duration: 0.3, ease: 'easeInOut' },
    });
  };


  useEffect(() => {
    if (modalOpen) {
      flipCard()
      setIsFlipped(true)
    } else if (!modalOpen && isFlipped) {
      flipCard()
      setIsFlipped(false)
    }
  }, [modalOpen])

  useEffect(() => {
    // Set leaveX to -1000 after the initial mount
    setLeaveX(-1000);
  }, []);

  const className = "swipe";

  return (
    <>
      {active ? (
        !isFlipped ? <motion.div
          draggable={false}
          drag={"x"}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          animate={controls}
          onClick={() => {
            flipCard();
            setIsFlipped(!isFlipped);
          }}
          whileDrag={{
            rotate: "-6deg"
          }}
          exit={{
            x: leaveX,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.3 },
          }}

          className={`${className} shadow`}
        >
          <CardContent drink={drink} />

        </motion.div> : <motion.div
          draggable={false}
          drag={"x"}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          animate={controls}
          onClick={() => {
            flipCard();
            setIsFlipped(!isFlipped);
          }}
          whileDrag={{
            rotate: "-6deg"
          }}
          exit={{
            x: leaveX,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          initial={{
            rotateY: 180
          }}
          className={`${className} shadow`}
        >
          <CardFlippedContent drink={drink} />

        </motion.div>
      ) : <div className={`${className} card-placeholder ${drink.idDrink.length % 2 === 0 ? "swipe-rotate-right" : "swipe-rotate-left"
        }`}>
        <CardContent drink={drink} />
      </div>}
    </>
  )
}

export default SwipeCard