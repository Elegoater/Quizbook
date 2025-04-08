const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createLike = async (token, post_id) => {
  const payload = {
    post_id: post_id, // Include post_id in the request body
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // Add payload to the request body
  };

  const response = await fetch(`${BACKEND_URL}/likes`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to like post");
  }

  return response.json();
};

export const getLikes = async (token, post_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/likes/post/${post_id}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch likes");
  }

  const data = await response.json();
  return data;
};