const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { get } = require('node-superfetch');

const playing = new Set();

module.exports = {
    name: "hangman",
    description: "You can save a stickman or else Kill him.",
    run: async(bot,  message, args) => {
		if (playing.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		playing.add(message.channel.id);
		try {
                        const { body } = await get('https://emilia-api.xyz/api/hangman')
                        .set('Authorization', `Bearer MzU2MDA1NzA4MTQ5NTU1MjAy.5r4BVOkZX8L1ial8chloqopkphU0w19us0UbqgxOQOo`);

			const word = body.word;
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill('◯');
			while (word.length !== confirmation.length && points < 6) {
				const embed = new MessageEmbed()
				.setColor('#FFB9BE')
				.setTitle('Hangman game')
				.setDescription(stripIndents`
					${displayText === null ? 'Here we go!' : displayText ? 'Good job!' : 'Nope!'}
					\`${display.join(' ')}\`. Which letter do you choose?
					Incorrect Tries: ${incorrect.join(', ') || 'None'}
					\`\`\`
				 . ┌─────┐
				 . ┃      ┋
				 . ┃      ${points > 0 ? 'O' : ''}
				 . ┃     ${points > 2 ? '/' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '\\' : ''}
				 . ┃     ${points > 4 ? '/' : ''}${points > 5 ? '\\' : ''}
				  =============
					\`\`\`
				`);
				let m = await message.channel.send(embed);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === message.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
        //m.delete();
				if (!guess.size) {
					await message.reply('Sorry, time is up!');
					break;
				}
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === word) {
					guessed = true;
					break;
				} else if (word.includes(choice)) {
					displayText = true;
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
						confirmation.push(word.charAt(i));
						display[i] = word.charAt(i);
					}
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				}
			}
			playing.delete(message.channel.id);
			if (word.length === confirmation.length || guessed) return message.channel.send(`You won, it was ${word}!`);
			return message.channel.send(`Too bad... It was ${word}...`);
		} catch (err) {
			playing.delete(message.channel.id);
			return message.reply(`Oh no, an error occurred :( \`${err.message}\`. Try again later!`);
		}
    }}
