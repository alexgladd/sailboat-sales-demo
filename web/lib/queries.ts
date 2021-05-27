import groq from 'groq'

export const allSailboatsForSale = groq`*[_type == "sailboat" && sold == false]`;
