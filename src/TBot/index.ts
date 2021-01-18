import TelegramBot from 'node-telegram-bot-api';
import GimnasticsTask from '../Gimnastics';
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
    const chatID = query.message?.chat.id;
    const userName = query?.from.username;

    if(!chatID || !userName) {
      console.error('Unknown callback');
      return;
    }

    switch (query.data) {
      case INLINE_KEYBOARD_CALLBACKS.MEANING_OF_LIFE:
        this.onMeaningOfLife(chatID, userName);
        break;
      case INLINE_KEYBOARD_CALLBACKS.GYMNASTIC:
        this.onGymnastic(chatID, userName);
        break;
      default:
        console.error('Unknown callback');
    }
  };

  onMeaningOfLife = (chatID: number, userName: string) => {
      this.botAPI.sendMessage(chatID, `@${userName}! Смысла жизни нет!`)
  };

  onGymnastic = (chatID: number, userName: string) => {
    if(GimnasticsTask.hasTask(userName)) {
      this.botAPI.sendMessage(chatID, 'У вас уже есть задание на сегодня!');
      return;
    }

    GimnasticsTask.createTask(userName);
    const task = GimnasticsTask.getTask(userName);
    this.botAPI.sendMessage(chatID, task.tasks.map((item, key) => `${key + 1}). ${item}`).join('\n'));
  };
}