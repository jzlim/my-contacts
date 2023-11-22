export const getDataFromApi = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      return result;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
