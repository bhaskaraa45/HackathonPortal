

import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  Text,
  ModalHeader
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  time?: number;
}

const CustomModal = ({ isOpen, onClose, title, description, time }: CustomModalProps) => {
  useEffect(() => {
    if (isOpen && time) {
      const timer = setTimeout(() => {
        onClose();
      }, time * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, time, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Center>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="#101232" borderRadius="md">
            <ModalHeader textAlign="center" color="white" fontSize="2rem" fontWeight="medium">{title}</ModalHeader>
            <ModalBody textAlign="center" mt={2}>
              <Text color="white" fontWeight="normal" fontSize="1.25rem">{description}</Text>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                borderRadius={8}
                fontWeight="500"
                fontSize="1.25rem"
                w="200px"
                h="48px"
                backgroundColor="#5134A4"
                colorScheme="purple"
                onClick={onClose}>
                CLOSE
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
};

export default CustomModal;

