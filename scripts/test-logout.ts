import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testLogout() {
  console.log('🧪 Testing logout functionality...');
  
  try {
    // Test 1: Check if logout API responds correctly
    console.log('1. Testing logout API...');
    const logoutResponse = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Logout API Status:', logoutResponse.status);
    const logoutData = await logoutResponse.json();
    console.log('Logout API Response:', logoutData);
    
    // Test 2: Check if /api/auth/me returns 401 after logout
    console.log('2. Testing /api/auth/me after logout...');
    const meResponse = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    console.log('Me API Status:', meResponse.status);
    if (meResponse.status === 401) {
      console.log('✅ /api/auth/me correctly returns 401 after logout');
    } else {
      console.log('❌ /api/auth/me should return 401 after logout');
    }
    
    // Test 3: Check if login page is accessible after logout
    console.log('3. Testing login page accessibility after logout...');
    const loginPageResponse = await fetch(`${BASE_URL}/login`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    console.log('Login Page Status:', loginPageResponse.status);
    if (loginPageResponse.status === 200) {
      console.log('✅ Login page is accessible after logout');
    } else {
      console.log('❌ Login page should be accessible after logout');
    }
    
    // Test 4: Check if homepage is accessible after logout
    console.log('4. Testing homepage accessibility after logout...');
    const homepageResponse = await fetch(`${BASE_URL}/`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    console.log('Homepage Status:', homepageResponse.status);
    if (homepageResponse.status === 200) {
      console.log('✅ Homepage is accessible after logout');
    } else {
      console.log('❌ Homepage should be accessible after logout');
    }
    
    console.log('✅ Logout test completed successfully');
    
  } catch (error) {
    console.error('❌ Logout test failed:', error);
  }
}

testLogout();
