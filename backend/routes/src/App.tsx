const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Response from server:", data);
  } catch (error) {
    console.error("Error connecting to server:", error);
  }
};