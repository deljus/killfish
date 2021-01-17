import TelegramBot from 'node-telegram-bot-api';

export const MESSAGES = {
  HELLO: /\/hello bot/
};

export default class TBot {
  botAPI: TelegramBot
  constructor(botAPI: TelegramBot) {
    this.botAPI = botAPI;

    this.botAPI.onText(MESSAGES.HELLO, this.helloMessage)
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
  }
}