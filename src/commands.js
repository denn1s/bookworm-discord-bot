export const BOOKWORM_COMMAND = {
  name: 'bookworm',
  description: 'Search for a light novel',
  options: [{
    name: 'query',
    description: 'Book title to search for',
    type: 3,
    required: true
  }]
}
