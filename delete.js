const db = require('./firebase');

async function deleteUser(id) {
    try {
      await db.collection('users').doc(id).delete();
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  
  deleteUser('user1');
  