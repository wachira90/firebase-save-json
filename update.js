const db = require('./firebase');

async function updateUser(id, data) {
    try {
      await db.collection('users').doc(id).update(data);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  
  updateUser('user1', { email: 'johnnewemail@example.com' });
  