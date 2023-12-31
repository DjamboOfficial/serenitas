export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("Requesting user data with token:", token);

    const response = await fetch("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
};

let currentTheme = "default";
