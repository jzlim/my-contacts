export const getDataFromApi = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      return result;
    }
    // Note: result has error property then it's invalid result
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
