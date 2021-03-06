/* server.js */

const express = require('express')
const next = require('next')
const window = require('global')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()
		if (typeof window === 'undefined') {
			global.window = {}
		  }
		server.get('/examinations/:id', (req, res) => {
			const actualPage = '/examinations'
			const queryParams = { id: req.params.id }
			console.dir("req.params.id = " + JSON.stringify(req.params.id))
			app.render(req, res, actualPage, queryParams)
		})

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	})