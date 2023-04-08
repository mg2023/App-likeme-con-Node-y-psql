const express = require('express')
const app = express()
const { agregarPost, leerPost, modificarPost, borrarPost} = require('./operacionesbd.js')

app.use(express.json())


const cors = require('cors')

// 1. Levantar un servidor local usando Express Js (2 Puntos)
app.listen(3000, () => {
    console.log('El servidor esta ok')
})

//1. Habilitar cors (2pts)
app.use(cors())

//3. Crear ruta get (3pts) 
app.get('/posts', async (req, res) => {
    const ans = await leerPost()
    console.log(ans)
    if (ans != 500){
        res.json(ans)
    }
    else{
        res.sendStatus(ans)
    }    
})

//4. Crear ruta post (3pts) 
app.post("/posts", async (req, res) => {
    const {titulo, url, descripcion} = req.body
    const myStatus = await agregarPost(titulo, url, descripcion)
    res.sendStatus(myStatus)
})

app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params
    const ans = await borrarPost(id)
    res.sendStatus(ans)
})

app.put('/posts/like/:id', async (req, res) => {
    const {id} = req.params
    const ans = await modificarPost(id)
    res.sendStatus(ans)
})

