const BASE_URL = "http://localhost:4000";

export const getCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ant-forms/country/list`);
    const data = await response.json();

    if (data.status === "error") {
      return { error: data };
    }

    return { data };
  } catch {
    return {
      error: {
        message: "Ошибка при загрузке списка стран",
        status: "error",
      },
    };
  }
};
