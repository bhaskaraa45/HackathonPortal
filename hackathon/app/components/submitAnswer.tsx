import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

export default function SubmitAnswer() {
    return (
        <Box
            className="answer_submission"
        >
            <InputGroup>
                <Input
                    placeholder="Paste your answer's URL"
                    width='100%'
                    paddingX="12px"
                    paddingY="10px"
                    color="black"
                    fontSize='1rem'
                />
                <InputRightElement width='9rem'>
                    <Button
                        marginTop='0px'
                        className="submitButton"
                        paddingX='36px'
                        h='2.8rem'
                        size='sm'
                        color='white'
                        bg='#2f5b98'
                        _hover={{ bg: '#1f2937' }}  // Optional: adding a hover effect
                    >
                        Submit
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
}
