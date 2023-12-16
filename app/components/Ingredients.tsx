import React from 'react';


const IngredientsList = ({ ingredients }) => {
  const ingredientString = ingredients.join(', ');

  return (
    <>
        <div className="flex space-x-2 items-center text-sm">
            <strong className="rounded-xl py-1 px-2 whitespace-nowrap bg-gray-800">Ingredients:</strong>
            <p className="text-gray-300">{ingredientString}</p>
        </div>
    </>
  )
};

export default IngredientsList;
