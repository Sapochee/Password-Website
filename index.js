const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 5501
app.use(bodyParser.json())
app.use(express.static(__dirname))

const supabaseUrl = 'https://ucqcwfhauugcwaueziit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcWN3ZmhhdXVnY3dhdWV6aWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNTQyNzgsImV4cCI6MjAzMTYzMDI3OH0.ohbk1W24Xr7FAbSsQrUE0iSBItjAEsoZeVurQ_afu6A'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname })
})

app.get('/passwords', async (req, res) => {
    console.log('Attempting to get password data')

    const { data, error } = await supabase
        .from('generatedPasswords')
        .select()
    if(error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.post('/passwords', async (req, res) => {
    console.log('Adding password')
    console.log(req.body)    
    var password = req.body.generated_password;
    
    const { data, error } = await supabase
        .from('generatedPasswords')
        .insert({ 'generated_password': password })
        .select()
    
    if(error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.listen(port, () => {
    console.log('APP WORKS')
})