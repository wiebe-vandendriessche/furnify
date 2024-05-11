const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:false,
    },
    lastname: {
        type: String,
        required:false,
    },
    email: {
        type: String,
        unique: true,
        required:false,
    },
    phone_number: {
        number: {
            type: Number,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
    },
    address: {
        type: String,
        required:false,
    }
});

const dimensionsSchema = new mongoose.Schema({
    length: Number,
    width: Number,
    height: Number
});

// Define Functionalities schema
const functionalitiesSchema = new mongoose.Schema({
    bed: Boolean,
    sofa: Boolean,
    office_space: Boolean,
    storage_space: Boolean
});

const obstacleItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    id: {
        type: Number,
        required: true
    },
    opening_door: {
        type: String,
        default: "right"
    },
    obstacleWall: {
        type: String,
        default: "front"
    },
    doorXpos: {
        type: Number,
        default: 0
    },
    windowWall: {
        type: String,
        default: "front"
    },
    inside_window: {
        type: String,
        default: "no"
    },
    windowXpos: {
        type: Number,
        default: 0
    },
    windowYpos: {
        type: Number,
        default: 0
    },
    obstLength: {
        type: Number,
        default: 0
    }
});

// Define Obstacles schema
const obstaclesSchema = new mongoose.Schema({
    door: [obstacleItemSchema],
    window: [obstacleItemSchema],
    other: [obstacleItemSchema]
});

// Define Specs schema
const specsSchema = new mongoose.Schema({
    color: String,
    material: String,
    layout: String
});

// Define Varia schema
const variaSchema = new mongoose.Schema({
    requirements: String,
    mattress: String,
    room: String,
    size: String
});

// Combine all schemas into one main schema
const superSchema = new mongoose.Schema({
    contact: contactSchema,
    dimensions: dimensionsSchema,
    functionalities: functionalitiesSchema,
    obstacles: obstaclesSchema,
    selectedWall: String, // Assuming it's a string or null
    specs: specsSchema,
    varia: variaSchema
});

const SuperModel = mongoose.model('SuperModel', superSchema);



module.exports = SuperModel;