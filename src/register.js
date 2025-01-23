import { BOOKWORM_COMMAND } from './commands.js'

async function registerGlobalCommands() {
  const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/commands`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify([BOOKWORM_COMMAND])
  })

  if (response.ok) {
    console.log('Command registered')
  } else {
    console.error('Error:', await response.text())
  }
}

await registerGlobalCommands()
