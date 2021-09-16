import { Composer, Scenes } from 'telegraf'
import { Delivers } from '../models'
const { enter } = Scenes.Stage

export const baseScene = new Scenes.WizardScene<Scenes.WizardContext>(
  'base-scene',
  async (ctx) => {
    const user = await Delivers.findOne({ where: { chat_id: ctx.chat?.id } })
    if (!user || user.status == 'new') {
      return ctx.scene.enter('register')
    } else {
      ctx.reply(`Привет 👋 ${user.name}`)
      ctx.wizard.next()
    }
  },
  new Composer<Scenes.WizardContext>()
    .command(['register', 'start'], async (ctx) => {
      const user = await Delivers.findOne({ where: { chat_id: ctx.chat?.id } })
      if (!user || user.status == 'new') {
        return ctx.scene.enter('register')
      } else {
        ctx.reply('Вы уже зарегистрировались')
      }
    })
    .on('text', async (ctx) => {
      ctx.reply('Нет обновлений')
    })
)
