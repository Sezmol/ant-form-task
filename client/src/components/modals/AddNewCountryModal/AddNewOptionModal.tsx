import { Form, Input, Modal } from "antd";
import { requiredRule } from "../../../utils/validationRules";
import { useForm } from "antd/es/form/Form";
import useFetchData from "../../../hooks/useFetchData";
import {
  SelectItemType,
  CommonResponse,
  PostNewOptionError,
} from "../../../types";

interface FormItemProps {
  label: string;
  requiredRuleError: string;
  placeholder: string;
}

export interface AddNewOptionModalProps {
  isOpen: boolean;
  modalTitle: string;
  codeItemProps: FormItemProps;
  userLabelItemProps: FormItemProps;
  onClose: () => void;
  fetchFunc: (
    data: SelectItemType
  ) => Promise<CommonResponse<unknown, PostNewOptionError>>;
}

type FormValues = {
  code: string;
  userLabel: string;
};

const AddNewOptionModal = ({
  isOpen,
  modalTitle,
  userLabelItemProps,
  codeItemProps,
  onClose,
  fetchFunc,
}: AddNewOptionModalProps) => {
  const [form] = useForm<FormValues>();
  const { fetchData, isLoading } = useFetchData<
    unknown,
    PostNewOptionError,
    SelectItemType
  >({
    fetchFunc: (data) => fetchFunc(data ?? ({} as SelectItemType)),
    immediatelyFetch: false,
  });

  const {
    label: codeLabel,
    requiredRuleError: codeRequiredRuleError,
    placeholder: codePlaceholder,
  } = codeItemProps;

  const {
    label: userLabelLabel,
    requiredRuleError: userLabelRequiredRuleError,
    placeholder: userLabelPlaceholder,
  } = userLabelItemProps;

  const onFinish = async (values: FormValues) => {
    const res = await fetchData(values);

    if (res?.error) {
      form.setFields([
        {
          name: [res.error.field],
          errors: [res.error.message],
        },
      ]);

      return;
    }

    onClose();
  };

  return (
    <Modal
      zIndex={1051}
      centered
      title={modalTitle}
      open={isOpen}
      onCancel={onClose}
      cancelText="Отмена"
      okText="Добавить запись"
      onOk={form.submit}
      confirmLoading={isLoading}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="addNewOption"
      >
        <Form.Item
          name="code"
          label={codeLabel}
          rules={[requiredRule(codeRequiredRuleError)]}
        >
          <Input placeholder={codePlaceholder} />
        </Form.Item>

        <Form.Item
          name="userLabel"
          label={userLabelLabel}
          rules={[requiredRule(userLabelRequiredRuleError)]}
        >
          <Input placeholder={userLabelPlaceholder} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewOptionModal;
