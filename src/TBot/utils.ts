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

export const INLINE_KEYBOARD_CALLBACKS = {
    MEANING_OF_LIFE: 'onMeaningOfLife',
    GYMNASTIC: 'onGymnastic',
    FORBIDDEN_ANIME: 'onForbiddenAnime'
}

export const INLINE_KEYBOARD = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Смысл жизни!',
                    callback_data: INLINE_KEYBOARD_CALLBACKS.MEANING_OF_LIFE
                }
            ],
            [
                {
                    text: 'Хочу потренероваться',
                    callback_data: INLINE_KEYBOARD_CALLBACKS.GYMNASTIC
                }
            ],
            [
                {
                    text: 'Список запрещенных аниме',
                    callback_data: INLINE_KEYBOARD_CALLBACKS.FORBIDDEN_ANIME

                }
            ]
        ]
    }
}

export const formattedListToString =  (list: string[]): string => {
    return list.map((item, key) => `${key + 1}. ${item}`).join('\n');
};

export const prepareTask = (tasks: string[], userName: string): string => {
    const task = formattedListToString(tasks);
    return `@${userName}! Твое задание на сегодня: \n${task}`
};

