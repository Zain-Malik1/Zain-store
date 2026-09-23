"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

type FavoriteContextType = {
  favoriteItems: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

const FavoriteContext = createContext<
  FavoriteContextType | undefined
>(undefined);

export function FavoriteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favoriteItems, setFavoriteItems] = useState<
    Product[]
  >([]);

  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {
    const savedFavorites =
      localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavoriteItems(JSON.parse(savedFavorites));
    }

    setIsLoaded(true);
  }, []);

  
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteItems)
    );
  }, [favoriteItems, isLoaded]);

  // Add product to favorites
  function addToFavorites(product: Product) {
    setFavoriteItems((prev) => {
      const alreadyFavorite = prev.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return prev;
      }

      return [...prev, product];
    });
  }

  
  function removeFromFavorites(productId: number) {
    setFavoriteItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  }

  // Check if product is favorite
  function isFavorite(productId: number) {
    return favoriteItems.some(
      (item) => item.id === productId
    );
  }

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoriteProvider"
    );
  }

  return context;
}