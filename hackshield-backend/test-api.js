const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing backend API...');
        
        // Test if server is running
        const response = await axios.get('http://localhost:5000/');
        console.log('✅ Server is running:', response.data);
        
        // Test games endpoint (should return 401 without auth)
        try {
            await axios.get('http://localhost:5000/api/games');
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Games endpoint exists (requires auth)');
            } else {
                console.log('❌ Games endpoint error:', error.response?.status);
            }
        }
        
    } catch (error) {
        console.log('❌ Server not running or error:', error.message);
    }
}

testAPI(); 