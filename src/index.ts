import { bot } from './bot'
import { sequelize } from './lib/utils'

async function start() {
  try {
    await sequelize.sync()
    bot.launch()
  } catch (error) {
    console.log(error)
  }
}
process.on('unhandledRejection', (reason, p) =>
  console.log('Unhandled Rejection at: Promise ', p, reason)
)

start()
