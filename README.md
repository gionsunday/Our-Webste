# Our-Webste

https://www.figma.com/proto/oI7Kz2KUisC0MKJsQr6Ra9/express-car?page-id=0%3A1&type=design&node-id=0-1&viewport=-1147%2C231%2C0.41&t=tbKQnLm234tVyp43-1&scaling=min-zoom&starting-point-node-id=9%3A144&mode=design



const { cloudinary } = require('./utils/cloudinary'); 
 const express = require('express'); 
 const app = express(); 
 var cors = require('cors'); 
  
 app.use(express.static('public')); 
 app.use(express.json({ limit: '50mb' })); 
 app.use(express.urlencoded({ limit: '50mb', extended: true })); 
 app.use(cors()); 
  
 app.get('/api/images', async (req, res) => { 
     const { resources } = await cloudinary.search 
         .expression('folder:dev_setups') 
         .sort_by('public_id', 'desc') 
         .max_results(30) 
         .execute(); 
  
     const publicIds = resources.map((file) => file.public_id); 
     res.send(publicIds); 
 }); 
 app.post('/api/upload', async (req, res) => { 
     try { 
         const fileStr = req.body.data; 
         const uploadResponse = await cloudinary.uploader.upload(fileStr, { 
             upload_preset: 'dev_setups', 
         }); 
         console.log(uploadResponse); 
         res.json({ msg: 'yaya' }); 
     } catch (err) { 
         console.error(err); 
         res.status(500).json({ err: 'Something went wrong' }); 
     } 
 }); 
  
 const port = process.env.PORT || 3001; 
 app.listen(port, () => { 
     console.log('listening on 3001'); 
 });