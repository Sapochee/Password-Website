const supabaseClient = require('@supabase/supabase-js')
const express = require('express')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://ucqcwfhauugcwaueziit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcWN3ZmhhdXVnY3dhdWV6aWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNTQyNzgsImV4cCI6MjAzMTYzMDI3OH0.ohbk1W24Xr7FAbSsQrUE0iSBItjAEsoZeVurQ_afu6A'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.length('/password', async (req, res) => {
    console.log('Attempting to GET passwords')

    const { data, error } = await supabase
        .from('generatedPasswords')
        .select()
    console.log('Data:', data)
    console.log('Error:', error)
})

app.listen(port, () => {
    console.log('Testing APP')
})