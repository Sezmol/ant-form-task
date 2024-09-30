import { Flex, Form, FormListOperation, Input } from "antd";
import CustomSelect from "../CustomSelect/CustomSelect";
import { postNewContactType } from "../../api";
import {
  DownSquareOutlined,
  MinusCircleOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { CommonError } from "../../types";
import { DefaultOptionType } from "antd/es/select";
import { requiredRule } from "../../utils/validationRules";

interface ContactTypeItemProps {
  selectOptions: DefaultOptionType[];
  isLoading: boolean;
  error: CommonError | null;
  name: number;
  move: FormListOperation["move"];
  remove: FormListOperation["remove"];
}

const ContactTypeItem = ({
  name,
  move,
  remove,
  error,
  isLoading,
  selectOptions,
}: ContactTypeItemProps) => {
  const ruleForFirstItem = name === 0 ? [requiredRule()] : [];

  return (
    <Flex gap={8} align="center">
      <Form.Item
        shouldUpdate
        label="Тип контакта"
        name={[name, "contact_type"]}
        rules={ruleForFirstItem}
      >
        <CustomSelect
          isLoading={isLoading}
          isError={!!error}
          selectProps={{
            placeholder: "Выберите тип контакта",
            options: selectOptions,
          }}
          modalProps={{
            codeItemProps: {
              label: "Название типа контакта",
              requiredRuleError: "Название типа контакта не должно быть пустым",
              placeholder: "Введите название типа контакта",
            },
            userLabelItemProps: {
              label: "Значение",
              requiredRuleError: "Значение не должно быть пустым",
              placeholder: "Введите значение",
            },
            modalTitle: "Добавить новый тип контакта",
            fetchFunc: postNewContactType,
          }}
        />
      </Form.Item>

      <Form.Item
        validateFirst
        label="Значение"
        name={[name, "value"]}
        rules={ruleForFirstItem}
      >
        <Input placeholder="Введите значение" />
      </Form.Item>

      <MinusCircleOutlined onClick={() => remove(name)} />
      <UpSquareOutlined onClick={() => move(name, name - 1)} />
      <DownSquareOutlined onClick={() => move(name, name + 1)} />
    </Flex>
  );
};

export default ContactTypeItem;
