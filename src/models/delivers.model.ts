import Sequelize from 'sequelize'
import { sequelize } from '../lib/utils'

export const Delivers = sequelize.define('delivers', {
  chat_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'new',
  },
})
