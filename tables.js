module.exports = {
    freeTables: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Свободные столики', callback_data: 'allFreeTables'}],
            ]
        })
    },
}