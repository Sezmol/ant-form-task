import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { loginRule, passwordRule } from "./utils/validationRules";
import "./App.css";

type FieldType = {
  login?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const App = () => (
  <div className="app">
    <Form layout="vertical" name="form" onFinish={onFinish} className="form">
      <Form.Item<FieldType>
        validateFirst
        label="Логин"
        name="login"
        rules={loginRule}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        validateFirst
        label="Пароль"
        name="password"
        rules={passwordRule}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default App;
