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
} from '@chakra-ui/react';


interface SignOutModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

const SignOutModal = ({ isVisible, onClose, onConfirm, title }: SignOutModalProps) => {

    return (
        <>
            <Center>
                <Modal isOpen={isVisible} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#101232" borderRadius="md">
                        <Center mt={4}>
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21" cy="21" r="21" fill="#5134A4" />
                                <g clip-path="url(#clip0_390_2657)">
                                    <path d="M24 12C24 11.1703 22.8828 10.5 21.5 10.5C20.1172 10.5 19 11.1703 19 12V24C19 24.8297 20.1172 25.5 21.5 25.5C22.8828 25.5 24 24.8297 24 24V12ZM21.5 31.5C22.3288 31.5 23.1237 31.3025 23.7097 30.9508C24.2958 30.5992 24.625 30.1223 24.625 29.625C24.625 29.1277 24.2958 28.6508 23.7097 28.2992C23.1237 27.9475 22.3288 27.75 21.5 27.75C20.6712 27.75 19.8763 27.9475 19.2903 28.2992C18.7042 28.6508 18.375 29.1277 18.375 29.625C18.375 30.1223 18.7042 30.5992 19.2903 30.9508C19.8763 31.3025 20.6712 31.5 21.5 31.5Z" fill="#F3F3F3" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_390_2657">
                                        <rect width="5" height="24" fill="white" transform="translate(19 9)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Center>
                        <ModalBody textAlign="center" mt={2}>
                            <Text
                                fontWeight="400"
                                fontSize="1.25rem"
                                color="white"
                            >{title}</Text>
                        </ModalBody>
                        <ModalFooter justifyContent="center">
                            <Button
                                color="white"
                                borderRadius={8}
                                fontWeight="500"
                                fontSize="1.25rem"
                                w="170px"
                                h="48px"
                                backgroundColor="#1D1E37"
                                colorScheme="#1D1E37"
                                mr={3}
                                onClick={onClose}>
                                No
                            </Button>
                            <Button
                                color="white"
                                borderRadius={8}
                                fontWeight="500"
                                fontSize="1.25rem"
                                w="170px"
                                h="48px"
                                backgroundColor="#5134A4"
                                colorScheme="purple"
                                onClick={onConfirm}>
                                Yes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Center>
        </>
    );
};

export default SignOutModal;
