# Installation and Running of New Words Telegram Bot

## Prerequisites:

- Installed [Docker](https://www.docker.com/)
- Installed [Docker Compose](https://docs.docker.com/compose/)

## Installation Steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/YuriiDorosh/new-words-telegram-bot
    cd new-words-telegram-bot
    ```

2. **Set up environment variables**

    Edit the `docker-compose.yml` file, replacing `your_bot_token` with your actual Telegram bot token.

3. **Build and Run the Bot**

    ```bash
    docker-compose up --build -d
    ```

    This command will build the Docker image and start your Telegram bot in the background.

4. **Check Status**

    You can check the status of your Docker containers with:

    ```bash
    docker-compose ps
    ```

5. **Stop the Bot**

    If you wish to stop the bot, simply run:

    ```bash
    docker-compose down
    ```

6. **Run the Bot again**

     ```bash
    docker-compose up -d
    ```

## Database Backup:

To backup your database, you simply need to copy the `./dbdata` folder.

## Database Restore:

To restore the database from a backup, just replace the `./dbdata` folder with your backup and restart the Docker containers.
