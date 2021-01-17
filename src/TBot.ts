import TelegramBot from 'node-telegram-bot-api';

export const MESSAGES = {
  HELLO: {
    REG_EX: /\/hello/,
    DESCRIPTION: '/hello - User greeting'
  },
  START: {
    REG_EX: /\/start/,
    DESCRIPTION: '/start - Start a training game'
  },
  HELP: {
    REG_EX: /\/help/,
    DESCRIPTION: '/help - Help information'
  }
};

export default class TBot {
  botAPI: TelegramBot
  constructor(token: string) {
    this.botAPI = new TelegramBot(token, { polling: true });

    this.botAPI.onText(MESSAGES.HELLO.REG_EX, this.helloMessage);
    this.botAPI.onText(MESSAGES.HELP.REG_EX, this.helpMessage);
    this.botAPI.onText(MESSAGES.START.REG_EX, this.startGame);
  }

  isGuz = (userName: string) => userName === 'kuzya_rk';

  isOwner = (userName: string) => userName === 'deljuse';

  helloMessage = ({ from, chat }: TelegramBot.Message) => {
    const username = from?.username;

    if(!username) {
      this.botAPI.sendMessage(chat.id, 'Username, я вас не знаю!');
    } else if(this.isGuz(username)) {
      this.botAPI.sendMessage(chat.id, 'Я не могу приветствовать врага моего хозяина!');
    } else {
      this.botAPI.sendMessage(chat.id, `Привет! @${username}.`);
    }
  };

  helpMessage = ({ chat }: TelegramBot.Message) => {
    // @ts-ignore
    const descriptions = Object.keys(MESSAGES).map(key => MESSAGES[key].DESCRIPTION)
    this.botAPI.sendMessage(chat.id, descriptions.join('\n'));
  }

  startGame = () => {

  };

}