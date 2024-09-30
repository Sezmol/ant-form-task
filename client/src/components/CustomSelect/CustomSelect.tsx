import { ReactElement } from "react";
import { Button, Divider, Select, SelectProps, Spin } from "antd";
import useModal from "../../hooks/useModal";
import AddNewOptionModal, {
  AddNewOptionModalProps,
} from "../modals/AddNewCountryModal/AddNewOptionModal";

interface CustomSelectProps {
  modalProps: Omit<AddNewOptionModalProps, "isOpen" | "onClose">;
  isLoading?: boolean;
  isError?: boolean;
  selectProps?: Omit<SelectProps, "dropdownRender">;
  value?: string;
  onChange?: (value: string) => void;
  customDropdownRender?: (options: ReactElement) => ReactElement;
}

const CustomSelect = ({
  isLoading,
  isError,
  selectProps,
  modalProps,
  value,
  onChange,
  customDropdownRender,
}: CustomSelectProps) => {
  const { isOpen, closeModal, openModal } = useModal();

  const dropdownRender = (options: ReactElement) => {
    if (isLoading) {
      return (
        <div className="selectOptionsWrapper">
          <Spin />
          <div>Загрузка....</div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="selectOptionsWrapper">
          При попытке получить список произошла ошибка
        </div>
      );
    }

    return (
      <>
        {options}
        <div>
          <Divider style={{ margin: "8px 0" }} />
          <Button onClick={openModal} block type="primary">
            Добавить
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Select
        value={value}
        onChange={onChange}
        dropdownRender={customDropdownRender ?? dropdownRender}
        {...selectProps}
      />
      <AddNewOptionModal isOpen={isOpen} onClose={closeModal} {...modalProps} />
    </>
  );
};

export default CustomSelect;
