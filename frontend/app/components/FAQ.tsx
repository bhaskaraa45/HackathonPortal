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
            <Box w="70%" color="#F3F3F3" p={5}>
                <Heading as="h2" fontSize="2rem" fontWeight="600" textAlign="start" mb={10}>Frequently asked questions</Heading>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={8}>
                    {faqs.map((faq, index) => (
                        <GridItem key={index}>
                            <Flex alignItems="center" mb={1}>
                                <Center w={8} h={8} bg="#5134A4" borderRadius="50%" mr={3}>
                                    <Text color="#F3F3F3" fontWeight="bold">?</Text>
                                </Center>
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
