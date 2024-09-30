import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import ContactTypeItem from "./ContactTypeItem";
import { getContactTypes } from "../../api";
import useFetchData from "../../hooks/useFetchData";
import { SelectItemType } from "../../types";
import { useMemo } from "react";

const ContactTypeList = () => {
  const { data, isLoading, error } = useFetchData<SelectItemType[]>({
    fetchFunc: getContactTypes,
  });

  const options = useMemo(
    () =>
      data
        ? data.map(({ code, userLabel }) => ({
            value: code,
            label: userLabel,
          }))
        : [],
    [data]
  );

  return (
    <Form.List name={["contacts"]} initialValue={[{}]}>
      {(fields, { add, remove, move }) => (
        <>
          {fields.map(({ key, name }) => (
            <ContactTypeItem
              key={key}
              name={name}
              error={error}
              isLoading={isLoading}
              selectOptions={options}
              move={move}
              remove={remove}
            />
          ))}
          <Form.Item shouldUpdate={(prev, curr) => console.log(prev, curr)}>
            {({ getFieldValue, getFieldsError }) => {
              console.log(
                "getFieldValue:",
                getFieldValue(["contacts", 0, "contact_type"])
              );

              console.log("getFieldsError:", getFieldsError(["contacts"]));

              return (
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить тип контакта
                </Button>
              );
            }}
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default ContactTypeList;
