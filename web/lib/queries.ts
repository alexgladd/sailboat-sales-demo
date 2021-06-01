import groq from 'groq'

export const sailboatById = groq`*[_type == "sailboat" && _id == $id]`;

export const allSailboatIdsForSale = groq`*[_type == "sailboat" && sold == false] { _id }`;

export const allSailboatsForSale = groq`*[_type == "sailboat" && sold == false]`;

export const featuredSailboatsForSale = groq`*[_type == "sailboat" && sold == false && featured == true] | order(_updatedAt desc) [0..2]`;
