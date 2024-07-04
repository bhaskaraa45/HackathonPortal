// import { useEffect } from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   description: string;
//   title: string;
//   time?: number; // in seconds
// }

// import React from "react";

// export default function CustomModal({ isOpen, onClose, description, title, time }: ModalProps) {
//   useEffect(() => {
//     if (isOpen && time) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, time * 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, time, onClose]);

//   if (!isOpen) return null;


//   return (
//     <>
//       {isOpen ? (
//         <>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-96 my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="customModal border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                   <h3 className="text-3xl text-white font-semibold">
//                     {title}
//                   </h3>
//                   {/* <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={onClose}
//                   >
//                     <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button> */}
//                 </div>
//                 {/*body*/}
//                 <div className="relative p-6 flex-auto">
//                   <p className="my-4 text-white text-lg leading-relaxed whitespace-pre-wrap">
//                     {description}
//                   </p>
//                 </div>
//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={onClose}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }


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
            {/* <Center mt={4}>
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="21" fill="#5134A4" />
                <g clipPath="url(#clip0_390_2657)">
                  <path d="M24 12C24 11.1703 22.8828 10.5 21.5 10.5C20.1172 10.5 19 11.1703 19 12V24C19 24.8297 20.1172 25.5 21.5 25.5C22.8828 25.5 24 24.8297 24 24V12ZM21.5 31.5C22.3288 31.5 23.1237 31.3025 23.7097 30.9508C24.2958 30.5992 24.625 30.1223 24.625 29.625C24.625 29.1277 24.2958 28.6508 23.7097 28.2992C23.1237 27.9475 22.3288 27.75 21.5 27.75C20.6712 27.75 19.8763 27.9475 19.2903 28.2992C18.7042 28.6508 18.375 29.1277 18.375 29.625C18.375 30.1223 18.7042 30.5992 19.2903 30.9508C19.8763 31.3025 20.6712 31.5 21.5 31.5Z" fill="#F3F3F3" />
                </g>
                <defs>
                  <clipPath id="clip0_390_2657">
                    <rect width="5" height="24" fill="white" transform="translate(19 9)" />
                  </clipPath>
                </defs>
              </svg>
            </Center> */}
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

