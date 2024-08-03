import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

const EmblaCarousel = (props) => {
  const { cards, options, onCardDeleted } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll(emblaApi);
    onSelect();
    emblaApi
      .on("reInit", () => {
        onScroll(emblaApi);
        onSelect();
      })
      .on("scroll", onScroll)
      .on("select", onSelect)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll, onSelect]);

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`/api/cards/delete?id=${id}`);
      onCardDeleted(id);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="embla pt-10">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {cards.map((card, index) => (
            <div
              className={`${
                index === currentIndex ? "saturate-100" : "saturate-0"
              } embla__slide`}
              key={card._id}
            >
              <div
                className={`embla__slide__content w-72 md:w-96 h-40 p-8 bg-sky-950 border border-sky-900 rounded-md text-sky-50 relative`}
              >
                <button
                  onClick={() => handleDeleteCard(card._id)}
                  className="bg-red-400 text-white px-2 rounded-sm absolute right-0 mr-10"
                >
                  Borrar
                </button>
                <span className="absolute z-10 bottom-0 right-0 pr-4 pb-2">
                {index + 1}
                </span>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__progress">
          <div
            className="embla__progress__bar"
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
