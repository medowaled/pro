import fetch from 'node-fetch';

async function testLogin() {
  try {
    console.log('🧪 Testing login functionality...');
    
    // Test admin login
    console.log('\n📱 Testing admin login...');
    const adminResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '966500000000',
        password: 'admin123'
      })
    });
    
    const adminData = await adminResponse.json();
    console.log('Admin login response:', adminData);
    
    if (adminResponse.ok) {
      console.log('✅ Admin login successful');
      console.log('👤 User role:', adminData.user.role);
    } else {
      console.log('❌ Admin login failed');
    }
    
    // Test /me endpoint
    console.log('\n🔍 Testing /me endpoint...');
    const meResponse = await fetch('http://localhost:3000/api/auth/me', {
      headers: {
        'Cookie': adminResponse.headers.get('set-cookie') || ''
      }
    });
    
    const meData = await meResponse.json();
    console.log('/me response:', meData);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLogin();
