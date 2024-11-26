const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // To read files if needed


// Import the schema
// const createShiplinkObjectSchema = require('./models/createShiplinkObject');



// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

const mongoURL = "mongodb+srv://AppuAmazonSambhav:1234@shiplinkobjectcluster.e4q75.mongodb.net/shiplink-object-db";

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Define a basic route
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

const carrierSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryDays: { type: String, required: true },
    maxWeight: { type: String, required: true },
    insurance: { type: String, required: true },
    rating: { type: Number, required: true },
    specialHandling: { type: [String], required: true },
    logo: { type: String, required: true }, 
  });


// Define schema for createShiplinkObject
const createShiplinkObjectSchema = new mongoose.Schema({
  ObjectTemplateName: { type: String, required: true },
  AmazonProductID: { type: Number, required: true },
  ShiplinkID: { type: String, required: true },
  Length: { type: Number, required: true },
  Breadth: { type: Number, required: true },
  Height: { type: Number, required: true },
  Weight: { type: Number, required: true },
  ProductName: { type: String, required: true },
  ProductDescription: { type: String, required: true },
  DeclaredValue: { type: Number, required: true },
  Currency: { type: String, required: true },
  PackagingType: { type: String, required: true },
  Temperature: { type: String },
  FragileItem: { type: Boolean, default: false },
  Hazardous: { type: Boolean, default: false },
  HumidityControl: { type: Boolean, default: false },
  Perishable: { type: Boolean, default: false },
  Biohazard: { type: Boolean, default: false },
  Oversized: { type: Boolean, default: false },
  Carrier_Content: {type: carrierSchema, required: true}, 
});

const createAutomationTemplateSchema = new mongoose.Schema({
    AutomationTemplateName: {type: String, required: true},
    ShiplinkObjectID: {type: String, required: true},
    MaxPrice: {type: Number, required: true},
    MaxDeliveryTime: {type: Number, required: true},
    PickupAddress: {type: String, required: true},
    NotifyMe: {type: Boolean, required: false},
    FBAfulfillement: {type: Boolean, required: false},
    FBMfulfillement: {type: Boolean, required: false},
    Marketplace: {type: String, required: true},
    MinimumInventory: {type: Number, required: true},
    NumReplenishOrders: {type: Number, required: true},
    TnC: {type: Boolean, required: true}
});

const Carrier = mongoose.model('Carrier', carrierSchema);
const CreateShiplinkObject = mongoose.model('createShiplinkObjectSchema', createShiplinkObjectSchema);
const CreateAutomationTemplate = mongoose.model('createAutomationTemplateSchema', createAutomationTemplateSchema);

function generateShiplinkID() {
    const prefix = "SL";
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return prefix + randomNumber;
}

function generateAutomationTemplateID() {
    const prefix1 = "AT";
    const prefix = "SL";
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return prefix1 + prefix + randomNumber;
}

// Route to handle creating an automation template 
app.post('/api/createAutomationTemplate', async (req, res) => {

    try {
        // extract data from the request body
        const {
            AutomationTemplateName,
            ShiplinkObjectID,
            MaxPrice,
            MaxDeliveryTime,
            PickupAddress,
            NotifyMe,
            FBAfulfillement,
            FBMfulfillement,
            DeliveryAddress,
            Marketplace,
            MinimumInventory,
            NumReplenishOrders,
            TnC
        } = req.body;

        //create a new Automation Template
        let AutomationTemplateID= generateAutomationTemplateID();

        const automationTemplate = new CreateAutomationTemplate({
            AutomationTemplateName,
            AutomationTemplateID,
            ShiplinkObjectID,
            MaxPrice,
            MaxDeliveryTime,
            PickupAddress,
            DeliveryAddress,
            NotifyMe,
            FBAfulfillement,
            FBMfulfillement,
            Marketplace,
            MinimumInventory,
            NumReplenishOrders,
            TnC
        });

        // Save the object to MongoDB
        await automationTemplate.save();
        console.log(automationTemplate);

        // Send a response back to the client
      res.status(201).json({ message: 'Shiplink Automation Template created successfully', data: automationTemplate });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create Automation Template' });
        console.log(req.body);
    }
});

app.get('/api/getAllAutomationTemplates', async (req, res) => {
    try {
        // Fetch all Shiplink objects from the collection
        const automationTemplates = await CreateAutomationTemplate.find();

        // Return the retrieved data as JSON
        res.status(200).json({
            message: 'Automation Templates retrieved successfully',
            data: automationTemplates
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch Automation Templates'
        });
    }
});

// to get an Automation Template by name
app.get('/api/getAutomationTemplate', async (req, res) => {
    try {
        // Extract query parameter
        const { AutomationTemplateName } = req.query;

        // Check if AutomationTemplateName is provided
        if (!AutomationTemplateName) {
            return res.status(400).json({
                error: 'AutomationTemplateName query parameter is required'
            });
        }

        // Find the Automation template with the matching AutomationTemplateName
        const automationTemplate = await CreateAutomationTemplate.findOne({ AutomationTemplateName });

        // If no matching object is found, return a 404
        if (!automationTemplate) {
            return res.status(404).json({
                error: `No Automation Template found with AutomationTemplateName: ${AutomationTemplateName}`
            });
        }

        // Return the found object
        res.status(200).json({
            message: 'Automation Template retrieved successfully',
            data: automationTemplate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch Automation Template'
        });
    }
});

// Route to handle creating a Shiplink object
app.post('/api/createShiplink', async (req, res) => {
    let shiplinkObject;
    try {
      // Extract data from the request body
      const {
        ObjectTemplateName,
        AmazonProductID,
        Length,
        Breadth,
        Height,
        Weight,
        // Commercial_Invoice,
        // Certificate_Of_Origin,
        // Export_Declaration,
        // Safety_Data_Sheet,
        // Product_Photos,
        ProductName,
        ProductDescription,
        DeclaredValue,
        Currency,
        PackagingType,
        Temperature,
        FragileItem,
        Hazardous,
        HumidityControl,
        Perishable,
        Biohazard,
        Oversized,
        Carrier_Content
      } = req.body;
  
      let ShiplinkID = generateShiplinkID();
      // Create a new Shiplink object
      const shiplinkObject = new CreateShiplinkObject({
        ObjectTemplateName,
        AmazonProductID,
        ShiplinkID,
        Length,
        Breadth,
        Height,
        Weight,
        ProductName,
        ProductDescription,
        DeclaredValue,
        Currency,
        PackagingType,
        Temperature,
        FragileItem,
        Hazardous,
        HumidityControl,
        Perishable,
        Biohazard,
        Oversized,
        Carrier_Content
      });
  

      

      // Save the object to MongoDB
      await shiplinkObject.save();
      

      // Send a response back to the client
      res.status(201).json({ message: 'Shiplink object created successfully', data: shiplinkObject });
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create Shiplink object' });
      console.log(req.body);
      console.log(shiplinkObject);

    }
});

app.get('/api/getAllShiplink', async (req, res) => {
    try {
        // Fetch all Shiplink objects from the collection
        const shiplinkObjects = await CreateShiplinkObject.find({});
        console.log("🔰  Fetched ShipLink objects")
        console.log(shiplinkObjects)
        // Return the retrieved data as JSON
        const jayson = {
            message: 'Shiplink objects retrieved successfully',
            data: shiplinkObjects
        }

        console.log('✅  Here is the JSON');
        console.log(jayson);

        
        res.status(200).json({
            message: 'Shiplink objects retrieved successfully',
            data: shiplinkObjects
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch Shiplink objects'
        });
    }
});


app.get('/api/getShiplink', async (req, res) => {
    try {
        // Extract query parameter
        const { ObjectTemplateName } = req.query;

        // Check if ObjectTemplateName is provided
        if (!ObjectTemplateName) {
            return res.status(400).json({
                error: 'ObjectTemplateName query parameter is required'
            });
        }

        // Find the Shiplink object with the matching ObjectTemplateName
        const shiplinkObject = await CreateShiplinkObject.findOne({ ObjectTemplateName });

        // If no matching object is found, return a 404
        if (!shiplinkObject) {
            return res.status(404).json({
                error: `No Shiplink object found with ObjectTemplateName: ${ObjectTemplateName}`
            });
        }

        // Return the found object
        res.status(200).json({
            message: 'Shiplink object retrieved successfully',
            data: shiplinkObject
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch Shiplink object'
        });
    }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});