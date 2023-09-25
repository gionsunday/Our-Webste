
const url = 'https://car-api2.p.rapidapi.com/api/vin/KNDJ23AU4N7154467';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1ed57a3380msh62d4ef476747f66p1efec7jsnbaacafbc4f35',
		'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}





Accepting Payments with Paystack API in Node.js and Express.js: Implementation and Best Practices
Leveraging the Paystack API within a Node.js environment to facilitate payment acceptance and verification — while ensuring a clean and scalable code.
Chiboy
Bits and Pieces
Chiboy

·
Follow

Published in
Bits and Pieces

7 min read
·
May 22

Listen


Share

Hello and welcome!

If you’re reading this, you’re in for an exciting tutorial. Today, I’ll guide you through the process of leveraging the Paystack API within a Node.js environment to facilitate payment acceptance and verification. But that’s not all! We’ll also dive into the realm of clean architecture, ensuring that our code is not only functional but also highly readable, maintainable, and scalable.

Before we go further into writing the code let's have a breakthrough of Paystack payment API. To receive payment using Paystack API you will need to make API calls to these three endpoints:

Initialize endpoint: The API expects the customer’s email, transaction amount in Kobo, and additional parameters. It will return a transaction reference, an access code for the SDK charge, and an authorization URL.
Verify endpoint: After a successful payment, call the endpoint to confirm the payment status. The response will provide an authorization code, allowing you to charge the user in future transactions.
Charge authorization: This endpoint is used to charge returning customers in the future without collecting their payment details after collecting them the first time.
Since this tutorial is centered around receiving payments through the Paystack API, we will be focusing on sending requests to the initialize endpoint. Additionally, for testing purposes, we will be using POSTMAN to interact with our application on the server side.

Let’s get started on this journey of exploration and implementation!

To get started, create a Paystack account by visiting the registration page. If you don’t have an account yet, simply sign up to create one.
Once you have signed up and logged into your Paystack dashboard, navigate to the Settings section and click on “API Keys and Webhooks”. From there, locate the Test Secret Key and make sure to securely save it. This key will be used to authenticate your application during API requests.
Let’s kickstart our project by creating a new folder. Open your command prompt or Git Bash terminal and run the following command to create a new project directory:
mkdir paystack-nodejs-app
This command will create a folder named “paystack-nodejs-app” which will serve as the root directory for our application. Feel free to replace “paystack-nodejs-app” with your preferred folder name.

4. To initialize a new Node.js project, navigate to the project folder and run this command.

cd paystack-nodejs-app
npm init -y
5. Install the required modules for this application by running the following command:

npm install express body-parser dotenv 
6. Next we need to create an index.js file in the root of our application, then add the following code.

// index.js file

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./Router/route')



const port = process.env.PORT || 3001;
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Call the routers 
app.use(router);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
7. Now, let’s create the controller file. In the root directory of your project, create a new folder called “controllers”. Inside the “controllers” folder, create a file named contollers.js.

// controllers/controllers.js file

require('dotenv').config();
const express = require('express');
const https = require('https');


const payStack = {

  acceptPayment: async(req, res) => {
    try {
      // request body from the clients
      const email = req.body.email;
      const amount = req.body.amount;
      // params
      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
      })
      // options
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: process.env.PUBLIC_KEY, // where you place your secret key copied from your dashboard
          'Content-Type': 'application/json'
        }
      }
      // client request to paystack API
      const clientReq = https.request(options, apiRes => {
        let data = ''
        apiRes.on('data', (chunk) => {
          data += chunk
        });
        apiRes.on('end', () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        })
      }).on('error', error => {
        console.error(error)
      })
      clientReq.write(params)
      clientReq.end()
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
}

const initializePayment = payStack;
module.exports = initializePayment;












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