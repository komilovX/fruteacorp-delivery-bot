import { Composer, Scenes } from 'telegraf'
import { Delivers } from '../models'

export const registerScene = new Scenes.WizardScene<Scenes.WizardContext>(
  'register',
  async (ctx) => {
    ctx.reply('Пожалуйста введите пароль')
    return ctx.wizard.next()
  },
  new Composer<Scenes.WizardContext>().on('text', async (ctx) => {
    const user = await Delivers.findOne({
      where: { password: ctx.message.text },
    })
    if (user) {
      await Delivers.update(
        {
          chat_id: ctx.chat.id,
          status: 'connected',
        },
        {
          where: { id: user.id },
        }
      )
      ctx.reply('Пароль подтвержден')
      return ctx.scene.enter('base-scene')
    } else {
      ctx.reply('Пароль не подтвержден')
      return ctx.wizard.back()
    }
  })
)
