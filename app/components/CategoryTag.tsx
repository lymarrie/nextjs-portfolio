import React from 'react';

const CategoryTag = ({ className, category }) => {
  const getTagStyle = () => {
    switch (category) {
        case 'Front-end Development':
            return 'bg-blue-900';
        case 'Product Management':
            return 'bg-orange-700'
        case 'Fun':
            return 'bg-pink-900';
        case 'Hello World':
            return 'bg-emerald-700';
      default:
        return 'bg-gray-500'; // Default background color if no match
    }
  };

  return (
    <div className="">
        <span className={`${className} rounded-xl py-1 px-2 text-sm whitespace-nowrap ${getTagStyle()}`}>
            {category}
        </span>
    </div>
  );
};


export default CategoryTag;
