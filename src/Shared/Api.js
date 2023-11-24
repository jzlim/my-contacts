export const getDataFromApi = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log("API response ok", response.ok);
    console.log("API result", result);
    if (!response.ok) {
      throw new Error(result.error);
    }

    if (result) {
      return result;
    }
  } catch (error) {
    if (typeof error === "object" && error?.error) {
      throw error.error; // { error: string }
    }
    throw error;
  }
};
