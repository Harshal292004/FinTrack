async function createUser(user: {email_address:string,username:string,first_name:string }) {
    try {
      const response = await fetch('https://saksham-vercel.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  
  export {createUser}