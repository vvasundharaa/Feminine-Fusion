// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const { RandomForestClassifier } = require('randomforest');
const natural = require('natural');

// Sample dataset with symptoms and corresponding PCOS types
const data = [
    { symptoms: "Irregular_periods Acne Infertility", PCOS_Type: "Type A" },
    { symptoms: "Excess_hair_growth Acne Regular_periods", PCOS_Type: "Type B" },
    { symptoms: "Irregular_periods Polycystic_ovaries Infertility", PCOS_Type: "Type C" },
    // Add more examples with symptoms and corresponding PCOS types
];

// Tokenize symptoms
const tokenizer = new natural.WordTokenizer();
const tokenizedData = data.map(entry => tokenizer.tokenize(entry.symptoms));

// Convert symptoms to feature vectors
const vectorizer = new natural.CountVectorizer();
const X = vectorizer.fit(tokenizedData).transform(tokenizedData);

// Convert PCOS types to numerical labels
const labelEncoder = new natural.LabelEncoder();
const encodedLabels = labelEncoder.fit_transform(data.map(entry => entry.PCOS_Type));

// Create a RandomForestClassifier model
const model = new RandomForestClassifier();

// Train the model
model.fit(X, encodedLabels);

// Initialize Express application
const app = express();
app.use(bodyParser.json());

// Define endpoint for prediction
app.post('/predict', (req, res) => {
    // Get form data from JSON request
    const { symptoms } = req.body;

    // Tokenize symptoms
    const tokenizedSymptoms = tokenizer.tokenize(symptoms);

    // Convert symptoms to feature vector
    const newFeatureVector = vectorizer.transform([tokenizedSymptoms]);

    // Make prediction
    const predictedLabelIndex = model.predict(newFeatureVector)[0];
    const predictedLabel = labelEncoder.inverse_transform([predictedLabelIndex])[0];

    // Return prediction as JSON response
    res.json({ predicted_pcos_type: predictedLabel });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
