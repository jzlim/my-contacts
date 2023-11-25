export const getDataFromApi = async (url: string) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }

    if (result) {
      return result;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong! Please try again.");
    }
  }
};
