import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import {
  buildNumberValidator,
  cityRule,
  cityRuleWithoutRequired,
  createValidator,
  loginRule,
  passwordRule,
  requiredRule,
} from "./utils/validationRules";
import "./App.css";
import { getCountries, postNewCountry } from "./api";
import useFetchData from "./hooks/useFetchData";
import { SelectItemType } from "./types";
import { useMemo } from "react";

import CustomSelect from "./components/CustomSelect/CustomSelect";
import ContactTypeList from "./components/ContactTypeList/ContactTypeList";

type FieldType = {
  login?: string;
  password?: string;
  confirm?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const App = () => {
  const {
    data: countries,
    isLoading: isCountriesLoading,
    error: errorCountries,
  } = useFetchData<SelectItemType[]>({
    fetchFunc: getCountries,
  });

  const selectCountryOptions = useMemo(
    () =>
      countries
        ? countries.map(({ code, userLabel }) => ({
            value: code,
            label: userLabel,
          }))
        : [],
    [countries]
  );

  return (
    <div className="app">
      <Form layout="vertical" name="user" onFinish={onFinish} className="form">
        <Form.Item validateFirst label="Логин" name="login" rules={loginRule}>
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Пароль"
          name="password"
          rules={passwordRule}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          validateFirst
          name="confirm"
          label="Повторите пароль"
          dependencies={["password"]}
          rules={[
            requiredRule(),
            ({ getFieldValue }) => {
              const password = getFieldValue("password");
              const confirm = getFieldValue("confirm");

              return {
                ...createValidator(password === confirm, "Пароли не совпадают"),
              };
            },
          ]}
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Страна"
          name={["realAddress", "country"]}
          rules={[requiredRule()]}
        >
          <CustomSelect
            isLoading={isCountriesLoading}
            isError={!!errorCountries}
            selectProps={{
              placeholder: "Выберите страну",
              options: selectCountryOptions,
            }}
            modalProps={{
              codeItemProps: {
                label: "Код страны",
                requiredRuleError: "Код страны не должен быть пустым",
                placeholder: "Введите код страны",
              },
              userLabelItemProps: {
                label: "Название страны",
                requiredRuleError: "Название страны не должно быть пустым",
                placeholder: "Введите страны название страны",
              },
              modalTitle: "Добавить новую страну",
              fetchFunc: postNewCountry,
            }}
          />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Город"
          rules={cityRule}
          name={["realAddress", "city"]}
        >
          <Input placeholder="Введите город" />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Улица"
          rules={cityRuleWithoutRequired}
          name={["realAddress", "street"]}
        >
          <Input placeholder="Введите улицу" />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Дом"
          rules={[buildNumberValidator]}
          name={["realAddress", "build_number"]}
        >
          <Input placeholder="Ввеедите номер дома" />
        </Form.Item>

        <Form.Item label="Контакты">
          <ContactTypeList />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
