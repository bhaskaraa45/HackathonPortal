import { Box, Button, Input, InputGroup, InputRightElement, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import makeApiCall from '../api/makeCall';
import CustomModal from "./customModal";
import { useRouter } from "next/router";
import SignOutModal from "./signOutModal";
import PrimaryButton from "./buttons";

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

    const buttonFontSize = useBreakpointValue({ base: "1rem", md: "1.25rem" });

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
            setIsSubmitting(false);

        } catch (error) {
            setTitle("Failed to submit!");
            setDesc("Failed to submit your answer, Please refresh this page and try again.");
            setIsOpen(true);
            console.error('Error submitting answer:', error);
        } finally {

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
            <Box bgColor="#0B0E29" pb={{ base: 4, md: 8 }}>
                {isSubmissionAllowed ? (
                    <Stack direction={"row"} spacing={8} align="center">
                        <Input
                            bgColor="#06081A"
                            fontSize="1rem"
                            fontWeight="500"
                            textColor="white"
                            borderRadius={8}
                            borderColor="grey"
                            focusBorderColor="white"
                            h="54px"
                            variant='outline'
                            placeholder='Paste your url here' />

                        <PrimaryButton
                            isLoading={isSubmitting}
                            onClick={() => { setIsSubmitVisible(true) }}
                            h="54px"
                            w="201px"
                            fontSize={buttonFontSize}
                            fontWeight="600"
                            text='SUBMIT'
                            fontWeightH="600"
                        />
                    </Stack>
                ) : (
                    <Text style={{ background: "white" }} color="red" fontSize="lg" textAlign="center">
                        You have already submitted your answer for this round.
                    </Text>
                )}
            </Box>
        </>
    );
}
