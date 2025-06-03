const express = require('express')
const exphbs = require('express-handlebars') // usar o main.handlebars do layout como padrão para os outros.
const mysql = require('mysql2')


const app = express()

// serve para pegar o a req body . title e pageqty
app.use(
    express.urlencoded({
        extended:true,
    }),
) 

app.use(express.json())


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})

// recebe a requisição e manda para o banco
app.post("/book/insertbook",(req,res)=>{

    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

//resgatando os dados do banco de dados
app.get('/books', (req,res)=>{
    const sql = 'SELECT * FROM books'

    conn.query(sql,function (err , data){
        if (err){
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', {books})
    })
})

// linka o banco
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '001376',
  database: 'nodemysql',
  port: 3306
});

conn.connect(function(err){
    if(err){
        console.log(err)
    }

    console.log('conectou ao Mysql!')

    app.listen(3000)
})