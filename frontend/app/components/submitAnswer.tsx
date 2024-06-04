import { Box, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import makeApiCall from '../api/makeCall';
import CustomModal from "./customModal";
import { useRouter } from "next/router";
import SignOutModal from "./signOutModal";

interface SubmitAnswerProps {
    last_submission: number;
    current_round: number;
}

export default function SubmitAnswer({ last_submission, current_round }: SubmitAnswerProps) {
    const [answerUrl, setAnswerUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Answer submitted!");
    const [desc, setDesc] = useState<string>("Your answer has been submitted successfully.");
    const [isSubmitVisible, setIsSubmitVisible] = useState<boolean>(false);
    const router = useRouter();

    console.log(last_submission)
    console.log(current_round)

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await makeApiCall('question', {
                method: 'POST',
                body: { answer: answerUrl },
            });

            if (response.status < 300) {
                setTitle("Answer submitted!");
                setDesc("Your answer has been submitted successfully.");
            } else {
                setTitle("Failed to submit!");
                setDesc("Failed to submit your answer, Please refresh this page and try again.");
            }
            setIsOpen(true);

        } catch (error) {
            setTitle("Failed to submit!");
            setDesc("Failed to submit your answer, Please refresh this page and try again.");
            setIsOpen(true);
            console.error('Error submitting answer:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmSubmit = () => {
        setIsSubmitVisible(false);
        handleSubmit();
    };

    const isSubmissionAllowed = last_submission !== current_round;

    return (
        <>
            <SignOutModal
                isVisible={isSubmitVisible}
                title="Are you sure you want to submit? After submitting, you cannot edit your response."
                onClose={() => setIsSubmitVisible(false)}
                onConfirm={handleConfirmSubmit}
            />

            <CustomModal
                isOpen={isOpen}
                title={title}
                description={desc}
                time={3}
                onClose={() => {
                    setIsOpen(false);
                    router.reload();
                }}
            />
            <Box className="answer_submission">
                {isSubmissionAllowed ? (
                    <InputGroup>
                        <Input
                            placeholder="Paste your answer's URL"
                            value={answerUrl}
                            onChange={(e) => setAnswerUrl(e.target.value)}
                            width='100%'
                            paddingX="12px"
                            paddingY="10px"
                            color="black"
                            fontSize='1rem'
                        />
                        <InputRightElement width='9rem'>
                            <Button
                                onClick={() => setIsSubmitVisible(true)}
                                marginTop='0px'
                                className="submitButton"
                                paddingX='36px'
                                h='2.8rem'
                                size='sm'
                                color='white'
                                bg='#2f5b98'
                                _hover={{ bg: '#1f2937' }}
                                isLoading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                ) : (
                    <Text style={{ background: "white" }} color="red" fontSize="lg" textAlign="center">
                        You have already submitted your answer for this round.
                    </Text>
                )}
            </Box>
        </>
    );
}
