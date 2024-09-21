import type { FormProps } from "antd";
import { Button, Form, Input, Select, Spin } from "antd";
import {
  createValidator,
  loginRule,
  passwordRule,
  requiredRule,
} from "./utils/validationRules";
import "./App.css";
import { getCountries } from "./api";
import useFetchData from "./hooks/useFetchData";
import { Country } from "./types";
import { useMemo } from "react";

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
    isLoading,
    error,
  } = useFetchData<Country[]>({
    fetchFunc: getCountries,
  });

  const selectOptions = useMemo(
    () =>
      countries
        ? countries.map(({ code, userLabel }) => ({
            value: code,
            label: userLabel,
          }))
        : [],
    [countries]
  );

  const dropdownRender = (options: React.ReactElement) => {
    if (isLoading) {
      return (
        <div className="selectOptionsWrapper">
          <Spin />
          <div>Загрузка списка стран...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="selectOptionsWrapper">
          При попытке загрузить список стран произошла ошибка
        </div>
      );
    }

    return options;
  };

  return (
    <div className="app">
      <Form layout="vertical" name="form" onFinish={onFinish} className="form">
        <Form.Item validateFirst label="Логин" name="login" rules={loginRule}>
          <Input />
        </Form.Item>

        <Form.Item
          validateFirst
          label="Пароль"
          name="password"
          rules={passwordRule}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
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
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Select options={selectOptions} dropdownRender={dropdownRender} />
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
