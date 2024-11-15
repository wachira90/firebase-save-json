const db = require('./firebase');

async function getUsersWithEmailFilter() {
  try {
    // Firestore query: Limit to 10 results and filter for emails ending with '@example.com'
    const usersRef = db.collection('users');
    const snapshot = await usersRef
      // .where('email', '>=', '@smartblocktech.ai')
      // .where('email', '<=', '\uf8ff@smartblocktech.ai')
      // .limit(10)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
}

getUsersWithEmailFilter();
