const RANOBEDB_API = "https://ranobedb.org/api/v0"
const RANOBEDB_IMAGES = "https://images.ranobedb.org"

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("OK")

    const signature = request.headers.get("x-signature-ed25519")
    const timestamp = request.headers.get("x-signature-timestamp")
    const body = await request.text()

    const interaction = JSON.parse(body)

    if (interaction.type === 1) {
      return new Response(JSON.stringify({ type: 1 }))
    }

    if (interaction.type === 2) {
      const query = interaction.data.options[0].value
      const searchResponse = await fetch(`${RANOBEDB_API}/series?q=${encodeURIComponent(query)}&limit=1`)
      const searchData = await searchResponse.json()

      if (!searchData.series || searchData.series.length === 0) {
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: "No books found",
            flags: 64  // Ephemeral message
          }
        }))
      }

      const bookId = searchData.series[0].book.id
      const bookResponse = await fetch(`${RANOBEDB_API}/book/${bookId}`)
      const bookData = await bookResponse.json()
      const book = bookData.book

      return new Response(JSON.stringify({
        type: 4,
        data: {
          embeds: [{
            title: book.title || book.title_orig,
            description: book.description || book.description_ja,
            image: {
              url: `${RANOBEDB_IMAGES}/${book.image.filename}`
            }
          }]
        }
      }))
    }
  }
}
