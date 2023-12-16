import React from 'react';


const IngredientsList = ({ ingredients }) => {
  const ingredientString = ingredients.join(', ');

  return (
    <>
        <div className="flex space-x-2 items-center text-sm">
            <span className="rounded-xl py-0.5 px-2 whitespace-nowrap bg-gray-800 text-gray-200 font-semibold">Ingredients:</span>
            <p className="text-gray-300">{ingredientString}</p>
        </div>
    </>
  )
};

export default IngredientsList;
