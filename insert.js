const db = require('./firebase');

async function createUser(id, data) {
  try {
    await db.collection('users').doc(id).set(data);
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser('user1', { name: 'Wachira Duangdee', email: 'wachira.d@smartblocktech.ai' });
