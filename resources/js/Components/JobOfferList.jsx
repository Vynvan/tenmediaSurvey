import React from 'react';

const JobOfferList = ({ jobOffers }) => {
   return (
      <div>
         <ul>
            {jobOffers && jobOffers.map(jobOffer => (
               <li key={jobOffer.id} className='mt-2 p-2 flex-col justify-between items-center'>
                  <p className='flex justify-between items-center'>
                     <span className="text-gray-800 font-semibold">{jobOffer.title}</span>
                     <small className="ml-2 text-sm text-gray-600">created by {jobOffer.created_by.name}</small>
                  </p>
                  <p className="text-gray-600">{jobOffer.company.name}</p>
                  <p className="text-gray-600">{jobOffer.category.name}</p>
                  <p className="text-gray-600">{jobOffer.location}</p>
                  <p className="text-gray-600">{jobOffer.salary}</p>
                  <p className='flex justify-between items-center'>
                     <a className="text-gray-800 font-semibold" href={`/job-offers/${jobOffer.id}`}>View Details</a>
                  </p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default JobOfferList;