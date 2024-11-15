const db = require('./firebase');

async function getUser(id) {
    try {
      const user = await db.collection('users').doc(id).get();
      if (user.exists) {
        console.log('User data:', user.data());
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }
  
  getUser('user1');
  