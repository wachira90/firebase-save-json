const fs = require('fs');
const path = require('path');
const db = require('./firebase');

async function saveCollectionToJson(collectionName) {
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();
    if (snapshot.empty) {
      console.log(`No documents found in collection: ${collectionName}`);
      return;
    }
    const collectionData = [];
    snapshot.forEach(doc => {
      collectionData.push({ id: doc.id, ...doc.data() });
    });

    // Create folder if it doesn't exist
    const folderPath = path.join(__dirname, 'export');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Save collection data to JSON file
    const filePath = path.join(folderPath, `${collectionName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(collectionData, null, 2));
    console.log(`Data from collection '${collectionName}' saved to ${filePath}`);
  } catch (error) {
    console.error(`Error retrieving collection '${collectionName}':`, error);
  }
}

async function listAndSaveCollections() {
  try {
    // Get a list of all collections in Firestore
    const collections = await db.listCollections();
    
    if (collections.length === 0) {
      console.log('No collections found in the Firestore database.');
      return;
    }

    // Save each collection to a separate JSON file
    for (const collection of collections) {
      await saveCollectionToJson(collection.id);
    }

  } catch (error) {
    console.error('Error listing collections:', error);
  }
}

listAndSaveCollections();
