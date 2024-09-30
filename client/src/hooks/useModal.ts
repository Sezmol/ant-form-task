import { useCallback, useState } from "react";

const useModal = () => {
  const [isOpen, setisOpen] = useState(false);

  const openModal = useCallback(() => {
    setisOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setisOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setisOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
