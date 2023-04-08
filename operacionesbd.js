//2. Usar el paguete pg (2pts)
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'ok',
    database: 'likeme',
    allowExitOnIdle: true
})

const agregarPost = async (titulo, url, descripcion) => {
    if(titulo, url, descripcion){
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)"
        const values = [titulo, url, descripcion]
        try{
            await pool.query(consulta, values)
            return(200)
        }
        catch{
            //Fail connect to db
            return(500)
        }
    }
    //Bad request
    return(400)
}

const leerPost = async () => {
    try{
        const { rows } = await pool.query("SELECT * FROM posts")
        return rows 
    }
    catch{
        //bad request
        return(400)
    }    
}

const modificarPost = async (id) => {
    try{
        let consulta = "SELECT likes FROM posts WHERE id = $1"
        let { rows } = await pool.query(consulta,[id])
        const cantLikes = rows[0].likes + 1;
        consulta = "UPDATE posts SET likes = $2 WHERE id = $1"
        const values = [id, cantLikes]
        await pool.query(consulta,values)
        return(200)
    }
    catch{
        //bad request
        return(400)
    }
}

const borrarPost = async (id) => {
    try{
        const consulta = 'DELETE FROM posts WHERE id = $1'
        const result = await pool.query(consulta,[id])
        console.log(result)
        console.log("Post borrado")
        return(200)
    }
    catch{
        //bad request
        return(400)        
    }
}

module.exports = { agregarPost, leerPost, modificarPost, borrarPost }