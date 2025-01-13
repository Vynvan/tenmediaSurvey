import React from 'react';

const CompanyList = ({ companies }) => {
   return (
      <div>
         <ul>
            {companies.map(company => (
               <li key={company.id}>
                  <p className='flex justify-between items-center'>
                     <span className="text-gray-800 font-semibold">{company.name}</span>
                     <small className="ml-2 text-sm text-gray-600">(created by {company.createdBy.name})</small>
                  </p>
                  <p className='flex justify-between items-center'>
                     <span className="text-gray-800 font-semibold">{company.website}</span>
                     <image className="ml-2 text-sm text-gray-600 w-25 h-25"
                        src={company.logo} alt="company logo" />
                  </p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CompanyList;
