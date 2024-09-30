import { SelectItemType, Method } from "../types";

const BASE_URL = "http://localhost:4000";

const getBaseError = (errorMessage: string) => ({
  error: {
    message: errorMessage,
    status: "error",
  },
});

const baseFetchFunction = async ({
  url,
  method,
  body,
  errorMessage = "Не удалось получить данные",
}: {
  url: string;
  method?: Method;
  body?: unknown;
  errorMessage?: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (data.status === "error") {
      return { error: data };
    }

    return { data };
  } catch {
    return getBaseError(errorMessage);
  }
};

export const getCountries = async () =>
  await baseFetchFunction({
    url: "ant-forms/country/list",
    errorMessage: "Не удалось получить список стран",
  });

export const postNewCountry = async (country: SelectItemType) =>
  await baseFetchFunction({
    url: "ant-forms/country",
    method: "POST",
    body: country,
    errorMessage: "Не удалось добавить новую страну",
  });

export const getContactTypes = async () =>
  await baseFetchFunction({
    url: "ant-forms/contact-type/list",
    errorMessage: "Не удалось получить список типов контактов",
  });

export const postNewContactType = async (contactType: SelectItemType) =>
  await baseFetchFunction({
    url: "ant-forms/contact-type",
    method: "POST",
    body: contactType,
    errorMessage: "Не удалось добавить новый тип контакта",
  });
