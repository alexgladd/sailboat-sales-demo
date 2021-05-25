import groq from 'groq'

export const allSailboatsForSale = groq`*[_type == "sailboat" && sold == false] | order(specs.loa asc, year asc, _createdAt asc)`;
