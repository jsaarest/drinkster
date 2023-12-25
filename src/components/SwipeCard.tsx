import { PanInfo, motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { Cocktail, SwipeType } from "../types";

export type SwipeCardProps = {
  card: Cocktail;
  removeCard: (oldCard: Cocktail, swipe: SwipeType) => void;
  active: boolean;
  children: ReactElement;
  onSwipeRight: () => void;
}

const SwipeCard = ({card, removeCard, active, onSwipeRight, children}: SwipeCardProps) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
      onSwipeRight();
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };

  const className = "swipe";

  return(
    <>
      {active ? (
        <motion.div
          drag={"x"}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          whileDrag={{
            rotate: "-6deg"
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={`${className} shadow`}
        >
          {children}
        </motion.div>
      ) : <div   className={`${className} ${
            card.idDrink.length % 2 === 0 ? "swipe-rotate-right" : "swipe-rotate-left"
          }`}>
        {children}
      </div>}
    </>
  )
}

export default SwipeCard