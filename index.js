const express = require('express')
const cors = require('cors')
const rp = require('request-promise')

const app = express()

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}))

app.get('/', (req, res) => res.redirect('https://hkgolden.com/'))

// https://web.hkgolden.com/api/topics/BW/1
app.get('/api/topics/:cat/:page', async (req, res) => {
  const { cat = 'BW', page = 1 } = req.params
  const json = await rp({
    uri: `https://web.hkgolden.com/api/topics/${cat}/${page}`,
    json: true,
  })
  res.json(json)
})

// https://web.hkgolden.com/api/view/6897687/1
app.get('/api/view/:id/:page', async (req, res) => {
  const { id = 1, page = 1 } = req.params
  const json = await rp({
    uri: `https://web.hkgolden.com/api/view/${id}/${page}`,
    json: true,
  })
  res.json(json)
})

app.listen(9000, () => console.log('hkg-proxy listening on port 9000!'))
