exports.handler = async () => {
  const apiUrl = "https://official-joke-api.appspot.com/random_joke";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    const joke = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fetchedAt: new Date().toISOString(),
        joke
      })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Failed to fetch joke from upstream API.",
        error: error.message
      })
    };
  }
};
