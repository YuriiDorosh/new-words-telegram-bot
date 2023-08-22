const { Telegraf } = require('telegraf');
const { 
    addWordHandler, 
    getWordsHandler, 
    deleteWordHandler,
    getRandomWordHandler, 
    helpHandler, 
    deleteAllWordsHandler 
} = require('./handlers');
const { initializeDatabase } = require('./database');

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

initializeDatabase();

bot.start(ctx => {
    const welcomeMessage = `
Welcome to the Words Bot! 📖✨

This bot will help you manage your personal word dictionary. Here's what you can do:

/add_word <word>-<translation> - Add a word and its translation.
/show_words - View all the words in your dictionary.
/delete_word <word> - Delete a specific word.
/delete_all - Delete all words.
/random_word - Get a random word and its translation.
/help - See this list of commands anytime you need.

Let's get started! Try adding your first word using /addword.
`;

    ctx.reply(welcomeMessage);
});
bot.command('help', helpHandler);
bot.hears(/\/add_word (.+)/, (ctx) => addWordHandler(ctx));
bot.hears(/\/delete_word (.+)/, (ctx) => deleteWordHandler(ctx));
bot.command('delete_all', deleteAllWordsHandler);
bot.command('show_words', (ctx) => getWordsHandler(ctx, bot));
bot.command('random_word', (ctx) => getRandomWordHandler(ctx));

bot.launch();
