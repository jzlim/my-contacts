const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getDataFromApi = async (url: string) => {
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

export const getCharacters = async (
  page: number,
  name: string | undefined = undefined,
  gender: string | undefined = undefined,
  status: string | undefined = undefined
) => {
  let url = `${baseUrl}/character`;
  url = `${url}?page=${encodeURIComponent(page)}`;
  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  if (gender) {
    url += `&gender=${encodeURIComponent(gender)}`;
  }
  if (status) {
    url += `&status=${encodeURIComponent(status)}`;
  }
  return await getDataFromApi(url);
};

export const getCharacterById = async (id: string) => {
  return getDataFromApi(`${baseUrl}/character/${encodeURIComponent(id)}`);
};

export const getEpisodes = async (ids: string) => {
  return await getDataFromApi(
    `${baseUrl}/episode/[${encodeURIComponent(ids)}]`
  );
};
