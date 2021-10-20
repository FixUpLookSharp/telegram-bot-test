

    // const countTables = Object.keys(await TebleModel.findAll( {
    //     attributes: ['id', 'status']
    // } )).length

    // const tables = await TebleModel.findAll( {
    //     attributes: ['id', 'status']
    // })
    //
    // let btn = []

    // for (let i = 0; i < countTables; i++) {
    //     if (i <= 3) {
    //         btn[0] = []
    //     }
    // }


    module.exports = {
        freeTables: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Свободные столики', callback_data: 'allFreeTables'}],
                ],
            })
        },
        tables: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'У окна', callback_data: '1'}, {text: 'На веранде', callback_data: '2'}, {text: 'Зал №1', callback_data: '3'}],
                    [{text: 'Вип комната', callback_data: '4'}, {text: 'На улице', callback_data: '5'}, {text: 'Зал №2', callback_data: '6'}],
                    [{text: 'Семейный', callback_data: '7'}, {text: 'На крыше', callback_data: '8'}, {text: 'Зал №3', callback_data: '9'}],
                ],
            })
        },
        cancel: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Отмена', callback_data: 'cancel'}],
                ]
            })
        },
    }


