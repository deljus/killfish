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
    GYMNASTIC: 'onGymnastic'
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
            ]
        ]
    }
}