import usePostFetch from "../Hooks/usePostFetch";
async function createUser(url, user) {
  const response = await fetch(
    'https://localhost:7077/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  try {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    } else {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

export async function getUser(email, password) {
  const response = await fetch(
    'https://localhost:7077/api/users', {
    method: 'GET',
    Headers: {
      'Content-Type': 'application/json',
    },
  });
  
  try {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    } else {
      const result = await response.json();
      console.log(result);
      return result;
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
export default createUser;

