import React from 'react';

const CompanyList = ({ companies }) => {
   return (
      <div>
         <ul>
            {companies && companies.map(company => (
               <li key={company.id} className='mt-2 p-2 flex-col justify-between items-center'>
                  <p className='flex justify-between items-center'>
                     <span className="text-gray-800 font-semibold">{company.name}</span>
                     <small className="ml-2 text-sm text-gray-600">created by {company.created_by?.name}</small>
                  </p>
                  <p className='flex justify-between items-center'>
                     <a className="text-gray-800 font-semibold" href={company.website}>{company.website}</a>
                     <img className="ml-2 text-sm text-gray-600 w-25 h-25"
                        src={company.logo} alt="company logo" />
                  </p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CompanyList;
