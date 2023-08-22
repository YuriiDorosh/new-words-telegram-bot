const { db } = require('./database');

const helpHandler = (ctx) => {
    const helpMessage = `
Welcome to the Words Bot!

Here are the commands you can use:

/add_word <word>-<translation> - Add a word and its translation to your dictionary.
/show_words - View all the words in your dictionary.
/delete_word <word> - Delete a specific word from your dictionary.
/random_word - Get a random word and its translation from your dictionary.
/help - Display this help message.

Example usage:
/addword hello-привіт
/delete_word hello
`;

    ctx.reply(helpMessage);
};

const addWordHandler = (ctx) => {
    const input = ctx.match[1];
    if (!input) {
        ctx.reply('Please provide a word and translation in the format: word-translation.');
        return;
    }
    
    const parts = input.split('-');
    if (parts.length !== 2) {
        ctx.reply('Please use the correct format: word-translation.');
        return;
    }

    const word = parts[0].trim();
    const translation = parts[1].trim();

    db.addWord(ctx.chat.id, word, translation)
        .then(() => {
            ctx.reply(`Added: ${word} - ${translation}`);
        })
        .catch((err) => {
            console.error(err);
            ctx.reply('There was an error adding the word.');
        });
};

const getWordsHandler = (ctx, bot) => {
    const chatId = ctx.chat.id;

    db.getWords(chatId).then((words) => {
        if (words.length === 0) {
            ctx.reply('Your dictionary is empty.');
            return;
        }

        const texts = words.map(w => `${w.word} - ${w.translation}`);
        ctx.reply(texts.join('\n'));
    }).catch((err) => {
        console.error(err);
        ctx.reply('There was an error fetching the words.');
    });
};

const deleteWordHandler = (ctx) => {
    const wordToDelete = ctx.match[1];
    if (!wordToDelete) {
        ctx.reply('Please provide a word to delete.');
        return;
    }

    db.deleteWord(ctx.chat.id, wordToDelete)
        .then(() => {
            ctx.reply(`Deleted: ${wordToDelete}`);
        })
        .catch((err) => {
            console.error(err);
            ctx.reply('There was an error deleting the word.');
        });
};

const getRandomWordHandler = (ctx) => {
    const chatId = ctx.chat.id;

    db.getRandomWord(chatId).then((word) => {
        if (!word) {
            ctx.reply('Your dictionary is empty.');
            return;
        }

        ctx.reply(`${word.word} - ${word.translation}`);
    }).catch((err) => {
        console.error(err);
        ctx.reply('There was an error fetching a random word.');
    });
};


module.exports = {
    addWordHandler,
    getWordsHandler,
    deleteWordHandler,
    getRandomWordHandler,
    helpHandler
};
