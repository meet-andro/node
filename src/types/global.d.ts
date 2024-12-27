import LogFunction from 'globals/log'
import Messages from 'globals/messages'

declare global {
  var log: typeof LogFunction
  var messages: typeof Messages
}

export {}
