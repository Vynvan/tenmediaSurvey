import React from 'react';

const CategoryList = ({ categories }) => {
   return (
      <div>
         <ul>
            {categories.map(category => (
               <li key={category.id} className='flex justify-between items-center'>
                  <span className="text-gray-800 font-semibold">{category.name}</span>
                  <small className="ml-2 text-sm text-gray-600">(created by {category.createdBy.name})</small>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CategoryList;
