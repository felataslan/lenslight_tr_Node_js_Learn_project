import express  from "express";

const app =express()

const port =3000
app.get('/',(req,res)=>{
res.send('Index Sayfası 3')
})

app.listen(port,()=>{
    console.log(`Application Running on port: ${port}`)
})