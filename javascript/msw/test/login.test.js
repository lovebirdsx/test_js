import fetch from 'node-fetch';

global.fetch = fetch;

test('allow user to log in', async () => {
    const response = await fetch('http://localhost/login', { method: 'POST' });
    expect(response.status).toBe(200);
    
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    expect(isAuthenticated).toBe('true');
});

test('fetch user information for authenticated user', async () => {
    // Setting the session as authenticated for this test
    sessionStorage.setItem('is-authenticated', 'true');
    
    const response = await fetch('http://localhost/user');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.username).toBe('admin');
});

test('fetch user information for unauthenticated user', async () => {
    sessionStorage.removeItem('is-authenticated');
    
    const response = await fetch('http://localhost/user');
    const data = await response.json();
    
    expect(response.status).toBe(403);
    expect(data.errorMessage).toBe('Not authorized');   
});
