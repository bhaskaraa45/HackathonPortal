

import React from 'react';
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
    description: React.ReactNode;
    button: string;
}

const NotRegisteredModal = ({ isOpen, onClose, description, button }: CustomModalProps) => {
    return (
        <>
            <Center>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#101232" borderRadius="md">
                        <ModalBody textAlign="center" mt={4}>
                            {description}
                            {/* <Text color="white" fontWeight="normal" fontSize="1.25rem">{description}</Text> */}
                        </ModalBody>
                        <ModalFooter justifyContent="center">
                            <Button
                                color="white"
                                borderRadius={8}
                                fontWeight="500"
                                fontSize="1.25rem"
                                w="200px"
                                h="48px"
                                backgroundColor="#5134A4"
                                colorScheme="purple"
                                onClick={onClose}>
                                {button}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Center>
        </>
    );
};

export default NotRegisteredModal;

