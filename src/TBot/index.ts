import TelegramBot from 'node-telegram-bot-api';
import { MESSAGES, INLINE_KEYBOARD, INLINE_KEYBOARD_CALLBACKS } from './utils';

export default class Index {
  botAPI: TelegramBot
  constructor(token: string) {
    this.botAPI = new TelegramBot(token, { polling: true });

    this.botAPI.onText(MESSAGES.HELLO.REG_EX, this.onHello);
    this.botAPI.onText(MESSAGES.HELP.REG_EX, this.onHelp);
    this.botAPI.onText(MESSAGES.START.REG_EX, this.onStart);
    this.botAPI.on('callback_query', this.onCallbackQuery);
  }

  onHello = ({ from, chat }: TelegramBot.Message) => {
    const username = from?.username;

    if(!username) {
      this.botAPI.sendMessage(chat.id, 'Username, я вас не знаю!');
      return;
    }

    this.botAPI.sendMessage(chat.id, `Привет! @${username}.`);
  };

  onHelp = ({ chat }: TelegramBot.Message) => {
    // @ts-ignore
    const descriptions = Object.keys(MESSAGES).map(key => MESSAGES[key].DESCRIPTION)
    this.botAPI.sendMessage(chat.id, descriptions.join('\n'));
  }

  onStart = ({ chat }: TelegramBot.Message) => {
    this.botAPI.sendMessage(chat.id, 'Что Вас тревожит?', INLINE_KEYBOARD);
  };

  onCallbackQuery = (query: TelegramBot.CallbackQuery) => {
    switch (query.data) {
      case INLINE_KEYBOARD_CALLBACKS.MEANING_OF_LIFE:
        this.onMeaningOfLife(query);
        break;
      case INLINE_KEYBOARD_CALLBACKS.GYMNASTIC:
        this.onGymnastic(query);
        break;
      default:
        console.error('Unknown callback')
    }
  };

  onMeaningOfLife = ({ message }: TelegramBot.CallbackQuery) => {
    if(message?.chat.id) {
      this.botAPI.sendMessage(message?.chat.id, 'Смысла жизни нет!')
    }
  };

  onGymnastic = ({ message }: TelegramBot.CallbackQuery) => {
    if(message?.chat.id) {
      this.botAPI.sendMessage(message?.chat.id, 'Смысла жизни нет!')
    }
  };
}