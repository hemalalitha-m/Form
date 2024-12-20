const express=require('express')
const mysql=require('mysql2')
const cors=require('cors')
const bodyParser=require('body-parser')


const app=express()
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'5785_Mohi',
    database:'employee'
})

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});


app.post('/add',(req,res)=>{
  const { fname, lname, empId, email, phone, dept, doj, workrole } = req.body;
  console.log('Received Data:', req.body);

  const checkQuery = 'SELECT * FROM emp WHERE email = ? OR empId = ?';
    db.query(checkQuery, [email, empId], (err, results) => {
      if (err) {
        console.error('Error during SELECT query:', err); // Log the error
        return res.status(500).json({ error: 'Database error during SELECT query' });
      }
  
      console.log('SELECT Query Results:', results);
  
      if (results.length > 0) {
        console.log('Duplicate Entry Detected');
        return res.status(400).json({ error: 'Email or Employee ID already exists' });
      }
        //if (err) return res.status(500).json({ error: 'Database error' });
        //if (results.length > 0) {
          //  return res.status(400).json({ error: 'Email or Employee ID already exists' });
        //}

        // Insert data if no duplicates
        const insertQuery = 'INSERT INTO emp (empId,fname,lname,email,phone,dept,doj,workrole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [empId, fname,lname, email, phone, dept, doj, workrole], (err) => {

            if (err){
              console.error('Error during INSERT query:', err); 
              return res.status(500).json({ error: 'Database error' });
          
            } 
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Employee added successfully' });
        });
    });
})

app.listen(8000, () => {
    console.log('Server is running');
});