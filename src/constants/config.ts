import 'dotenv/config'

const config: any = {
  APP_PORT: process.env.PORT || 3030,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY : process.env.SECRET_KEY || 'secret'
}
export default config
