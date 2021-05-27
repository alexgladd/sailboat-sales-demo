import groq from 'groq'

export const allSailboatsForSale = groq`*[_type == "sailboat" && sold == false]`;

export const featuredSailboatsForSale = groq`*[_type == "sailboat" && sold == false && featured == true] | order(_updatedAt desc) [0..2]`;
