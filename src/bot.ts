import { Scenes, Telegraf, session } from 'telegraf'
import { Delivers } from './models'

import * as scenes from './scenes'

const token = process.env.TOKEN
if (token === undefined) {
  throw new Error('Bot Token must be provided!')
}

const bot = new Telegraf<Scenes.WizardContext>(token)

const stage = new Scenes.Stage<Scenes.WizardContext>(
  Object.values(scenes).map((scene) => scene),
  { default: 'base-scene' }
)

bot.use(session())
bot.use(stage.middleware())

export { bot }
