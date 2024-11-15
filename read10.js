const db = require('./firebase');

async function getDrivers() {
  try {
    const driversQuery = await db.collection('users')
      .where('role', '==', 'driver')  // Filter by role
      .where('isActive', '==', true)
      .limit(10)  // Limit to 10 results
      .get();

    if (!driversQuery.empty) {
      driversQuery.forEach(doc => {
        console.log('Driver data:', doc.id, doc.data());
      });
    } else {
      console.log('No drivers found!');
    }
  } catch (error) {
    console.error('Error getting drivers:', error);
  }
}

getDrivers();
