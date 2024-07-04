import React from 'react';
import { Box, Grid, GridItem, Text, Center, Heading, Flex } from '@chakra-ui/react';

const FaqSection = () => {
    const faqs = [
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        // Add more FAQs as needed
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
        {
            question: 'What do you mean by "Figma assets"?',
            answer: 'You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.'
        },
    ];

    return (
        <Center>
            <Box w={{base: "95%", lg: "70%"}} color="#F3F3F3" p={5}>
                <Heading as="h2" fontSize="2rem" fontWeight="600" textAlign="start" mb={10}>Frequently asked questions</Heading>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={8}>
                    {faqs.map((faq, index) => (
                        <GridItem key={index}>
                            <Flex alignItems="center" mb={1}>
                                <Box mr={3}>
                                    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="17.6787" cy="17.6787" r="17.6787" fill="#5134A4" />
                                        <path d="M16.5862 20.2418C16.5862 19.7313 16.669 19.2828 16.8345 18.8965C17.0001 18.5102 17.214 18.1652 17.4761 17.8617C17.7383 17.5581 18.0143 17.2752 18.304 17.0131C18.6076 16.7509 18.8904 16.4957 19.1526 16.2473C19.4148 15.9989 19.6286 15.7368 19.7942 15.4608C19.9598 15.1848 20.0426 14.8744 20.0426 14.5294C20.0426 13.9499 19.808 13.4808 19.3389 13.122C18.8697 12.7633 18.2419 12.5839 17.4554 12.5839C16.6966 12.5839 16.0343 12.7219 15.4685 12.9979C14.9166 13.2738 14.4544 13.6671 14.0818 14.1776L12.0742 12.8737C12.6537 12.0872 13.4126 11.4732 14.3509 11.0316C15.2892 10.5763 16.3999 10.3486 17.6831 10.3486C18.6904 10.3486 19.5734 10.5004 20.3323 10.804C21.0912 11.0937 21.6845 11.5215 22.1123 12.0872C22.54 12.6391 22.7539 13.3152 22.7539 14.1155C22.7539 14.6674 22.6642 15.1503 22.4848 15.5643C22.3192 15.9782 22.0985 16.3439 21.8225 16.6612C21.5604 16.9648 21.2775 17.2545 20.9739 17.5305C20.6704 17.7927 20.3806 18.0548 20.1047 18.317C19.8425 18.5792 19.6286 18.862 19.4631 19.1656C19.2975 19.4691 19.2147 19.8279 19.2147 20.2418H16.5862ZM17.9108 25.1884C17.4278 25.1884 17.0277 25.0297 16.7104 24.7124C16.4068 24.395 16.255 24.0156 16.255 23.574C16.255 23.1325 16.4068 22.76 16.7104 22.4564C17.0277 22.139 17.4278 21.9804 17.9108 21.9804C18.3937 21.9804 18.787 22.139 19.0905 22.4564C19.3941 22.76 19.5458 23.1325 19.5458 23.574C19.5458 24.0156 19.3941 24.395 19.0905 24.7124C18.787 25.0297 18.3937 25.1884 17.9108 25.1884Z" fill="#F3F3F3" />
                                    </svg>
                                </Box>
                                <Text fontSize="1.25rem" fontWeight="bold">{faq.question}</Text>
                            </Flex>
                            <Text ml={12} fontSize="1.2rem" fontWeight="medium">{faq.answer}</Text>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Center>

    );
};

export default FaqSection;
