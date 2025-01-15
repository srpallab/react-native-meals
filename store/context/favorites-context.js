import {createContext, useState} from "react";

export const FavoritesContext = createContext({
    mealIds: [],
    addFavorite: (id) => {
    },
    removeFavorite: (id) => {
    },
});

export const FavoritesContextProvider = ({children}) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavoriteMeal(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavoriteMeal(id) {
        setFavoriteMealIds((currentFavIds) =>
            currentFavIds.filter((mealId) => mealId !== id)
        );
    }

    const values = {
        mealIds: favoriteMealIds,
        addFavorite: addFavoriteMeal,
        removeFavorite: removeFavoriteMeal,
    };

    return (
        <FavoritesContext.Provider value={values}>
            {children}
        </FavoritesContext.Provider>
    );
}

