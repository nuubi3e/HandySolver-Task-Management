import jsonServer from "json-server"

const server = jsonServer.create()
const router = jsonServer.router("./db/db.json")
const middleware = jsonServer.defaults({ noCors: true })

server.use(middleware)
server.use(router)
server.listen(3000, () => console.log("Server is running on http://localhost:3000"))