"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import AddCard from "@/components/card/AddCard";
import PrintCards from "@/components/button/variantButton";

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/cards/get");
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
    setIsLoading(false);
  };

  const handleCardAdded = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleCardDeleted = (deletedCardId) => {
    setCards(cards.filter((card) => card._id !== deletedCardId));
  };

  const OPTIONS = { loop: true };

  return (
    <div>
      <div className="w-full mx-auto text-center">
        <PrintCards cards={cards} />
      </div>
      {isLoading ? (
        <button
          type="button"
          className="bg-sky-950 mt-10 mx-auto px-3 text-white flex round-md border border-white items-center"
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
      ) : (
        <EmblaCarousel
          cards={cards}
          options={OPTIONS}
          onCardDeleted={handleCardDeleted}
        />
      )}
      <div className="bg-sky-950 border border-sky-900 rounded-md text-sky-50 w-full md:w-4/6 mt-10 px-10 pt-6 pb-10 mx-auto">
        <h2 className="text-xl text-white py-4">Agregar tarjetas</h2>
        <AddCard onCardAdded={handleCardAdded} />
      </div>
    </div>
  );
};

export default CardManager;
