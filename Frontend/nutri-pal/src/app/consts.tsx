

export const BASE_URL_REST_API = 'http://localhost:2024/'
export const TIME_ZONE = 'T00:00:00.000Z'

const EDAMAME_API_KEY = process.env.NEXT_PUBLIC_EDAMAME_API_KEY
const EDAMAME_APP_ID = process.env.NEXT_PUBLIC_EDAMAME_APP_ID
export const BASE_URL_EDAMAME_SEARCH_API = 'https://api.edamam.com/api/food-database/v2/parser?' + `app_id=${EDAMAME_APP_ID}` + `&app_key=${EDAMAME_API_KEY}` + '&category=generic-meals'

export const PROTEIN_COLOR = '#ff6666'
export const CARBS_COLOR = '#cfbb22'
export const FATS_COLOR = '#5aae5a'
