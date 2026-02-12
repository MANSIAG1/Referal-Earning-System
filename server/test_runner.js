const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./server');
const axios = require('axios');
const http = require('http');

let mongoServer;
let server;
const PORT = 5001;
const API_URL = `http://localhost:${PORT}/api`;

async function startTestServer() {
    process.env.JWT_SECRET = 'testsecret';
    
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log('In-Memory MongoDB Connected');

    server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Test Server running on port ${PORT}`);
        runTests();
    });
}

async function runTests() {
    try {
        console.log('--- Starting Backend Test (In-Memory DB) ---');

        // 1. Signup User A (Root)
        console.log('\n1. Signing up User A...');
        const userA = await axios.post(`${API_URL}/auth/signup`, {
            username: 'UserA',
            email: `usera_${Date.now()}@test.com`,
            password: 'password123'
        });
        console.log('User A Signup Success:', userA.data.user.referralCode);
        const tokenA = userA.data.token;
        const codeA = userA.data.user.referralCode;

        // 2. Signup User B (Referred by A)
        console.log('\n2. Signing up User B (Referred by A)...');
        const userB = await axios.post(`${API_URL}/auth/signup`, {
            username: 'UserB',
            email: `userb_${Date.now()}@test.com`,
            password: 'password123',
            referralCode: codeA
        });
        console.log('User B Signup Success:', userB.data.user.referralCode);
        const tokenB = userB.data.token;
        const codeB = userB.data.user.referralCode;

        // 3. Signup User C (Referred by B)
        console.log('\n3. Signing up User C (Referred by B)...');
        const userC = await axios.post(`${API_URL}/auth/signup`, {
            username: 'UserC',
            email: `userc_${Date.now()}@test.com`,
            password: 'password123',
            referralCode: codeB
        });
        console.log('User C Signup Success');
        const tokenC = userC.data.token;

        // 4. User C makes a purchase > 1000
        console.log('\n4. User C buying item (Price: 1200, Profit: 200)...');
        // Expected: 
        // L1 (User B) gets 5% of 200 = 10
        // L2 (User A) gets 1% of 200 = 2
        await axios.post(`${API_URL}/shop/purchase`, {
            productId: '1', // Dummy ID
            price: 1200,
            profit: 200
        }, {
            headers: { Authorization: tokenC }
        });
        console.log('Purchase Successful');

        // 5. Verify User B Earnings
        console.log('\n5. Verifying User B earnings...');
        const statsB = await axios.get(`${API_URL}/auth/user`, {
            headers: { Authorization: tokenB }
        });
        console.log(`User B Earnings (Direct): ${statsB.data.earnings.direct} (Expected 10)`);
        if (statsB.data.earnings.direct !== 10) throw new Error('User B earnings incorrect');

        // 6. Verify User A Earnings
        console.log('\n6. Verifying User A earnings...');
        const statsA = await axios.get(`${API_URL}/auth/user`, {
            headers: { Authorization: tokenA }
        });
        console.log(`User A Earnings (Indirect): ${statsA.data.earnings.indirect} (Expected 2)`);
        if (statsA.data.earnings.indirect !== 2) throw new Error('User A earnings incorrect');

        console.log('\n--- Test Completed Successfully ---');
        process.exit(0);

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
        console.error('Error Details:', error.toJSON ? error.toJSON() : error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        await mongoServer.stop();
        server.close();
    }
}

startTestServer();
