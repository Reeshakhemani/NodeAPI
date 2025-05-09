const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
       try{
        res.json('WELCOME TO HR API');
       } catch(err){
        res.status(500).json({Error:err.message});

        }
       
});
app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from country');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});


    }
});



app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});


    }
});

app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name, e.last_name, e.employee_id,e.email,e.phone_number, jd.* from employees e join job_history jd on jd.employee_id=e.employee_id limit 7');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/employee-job-history', async (req, res) => { 
    try { const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
    jh.start_date, jh.end_date, jh.job_id, jh.department_id FROM employees e JOIN job_history jh ON e.employee_id = jh.employee_id`); 
         res.json(result.rows); } 
    catch (err) { 
      res.status(500).json({ Error: err.message }); } 
  });             
  
  
  app.get('/employee-history-with-department', async (req, res) => {
    try { const result = await pool.query(`Select e.employee_id, e.first_name, e.last_name, 
    jh.start_date, jh.end_date, jh.job_id, jh.department_id, d.department_name 
    FROM employees e JOIN job_history jh ON e.employee_id = jh.employee_id
    JOIN departments d ON jh.department_id = d.department_id`);
         res.json(result.rows); 
        } catch (err) {
      res.status(500).json({ Error: err.message }); } 
  });


  app.get('/employee-history-location', async (req, res) =>{
    try { const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
    jh.start_date, jh.end_date, jh.job_id, jh.department_id, d.department_name,
    l.location_id, l.city, l.state_province FROM employees 
    e JOIN job_history jh ON e.employee_id = jh.employee_id 
    JOIN departments d ON jh.department_id = d.department_id
    JOIN locations l ON d.location_id = l.location_id`);
         res.json(result.rows); }
    catch (err) {
      res.status(500).json({ Error: err.message }); }
  });
  app.get('/employee-history-country', async (req, res) => {
    try { const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
    jh.start_date, jh.end_date, jh.job_id, jh.department_id, d.department_name,
    l.location_id, l.city, l.state_province,
    c.country_name FROM employees e JOIN job_history jh ON e.employee_id = jh.employee_id
    JOIN departments d ON jh.department_id = d.department_id JOIN locations
    l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id`);
         res.json(result.rows); } 
    catch (err) {
      res.status(500).json({ Error: err.message }); }
  });  







  app.get('/job-history-details', async (req, res) => 
    { try { const result = await pool.query(`Select jh.employee_id, e.first_name, e.last_name, 
    jh.start_date, jh.end_date, jh.job_id, jh.department_id, d.department_name FROM job_history 
    jh JOIN employees e ON jh.employee_id = e.employee_id 
    JOIN departments d ON jh.department_id = d.department_id`); 
           res.json(result.rows);
          } catch (err) { 
      res.status(500).json({ Error: err.message }); } 
    });

    
app.get('/job_history', async (req, res) => { 
  try { const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, e.email,job_id,jh.start_date, jh.end_date, d.department_name FROM job_history j LEFT JOIN employees e ON jh.employee_id = e.employee_id LEFT JOIN departments d ON jh.department_id = d.department_id'); 
       res.json(result.rows); }
  catch (err) {
    res.status(500).json({ Error: err.message }); }
});
        
app.get('/regions', async(req , res)=>{ 
try{
const result = await pool.query('select r.region_name,c.country_name, l.location_id from regions r left join countries c on r.region_id = c.region_id left join locations l on c.country_id =l.country_id');
res.json(result.rows);
}catch(err){
res.status(500).json({Error:err.message});
}
});



app.get('/country', async(req , res)=>{ 
try{
const result = await pool.query('select c.country_name,r.region_name, l.location_id from countries c left join regions r on c.region_id = r.region_id left join locations l on c.country_id =l.country_id');
res.json(result.rows);
}catch(err){
res.status(500).json({Error:err.message});
}
});





        
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succefully....on PORT ${PORT}`);
});