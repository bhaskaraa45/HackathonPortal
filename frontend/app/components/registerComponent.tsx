import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepNumber,
  StepSeparator,
  useSteps,
  StepIcon,
  InputGroup,
  InputLeftElement,
  Stack,
  Flex,
  Spacer,
  useBreakpointValue,
  Text,
  FormErrorMessage,
  Grid,
  GridItem,
  Icon,
  ChakraProvider,
  extendTheme,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';
import { getSessionUser } from '../api/auth';
import { useRouter } from 'next/router';
import CustomModal from './customModal';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';
import makeApiCall from '../api/makeCall';
import { json } from 'stream/consumers';

const steps = [
  { title: 'First', description: 'Email Verification' },
  { title: 'Second', description: 'Team Info' },
  { title: 'Third', description: 'Members Info' },
];

interface RegistrationFormProps {
  email: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ email }) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const router = useRouter();

  const [leaderEmail, setLeaderEmail] = useState<string>('');
  const [leaderName, setLeaderName] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [teamNameError, setTeamNameError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaderName(e.target.value);
    if (e.target.value.trim() !== '') {
      setNameError('');
    }
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFirstNext = () => {
    if (leaderEmail.trim() !== '' && leaderName.trim() !== '') {
      handleNext();
    } else {
      if (leaderName.trim() === '') {
        setNameError('Please enter your name');
      } else {
        router.replace('/login');
      }
    }
  };

  const handleSecondNext = async () => {
    try {
      const response = await makeApiCall('validteam', { method: "POST", body: JSON.stringify({ "team_name": teamName }) })
      if (response.status === 200) {
        if (response.data.valid) {
          setTeamNameError('')
          handleNext();
        } else {
          setTeamNameError("This name has already been taken, please consider different team name.")
        }
      }
    } catch (error) {
      setTeamNameError("This name has already been taken, please consider different team name.")
      console.log(error)
    }
  }

  const checkSession = async () => {
    if (email.length === 0) {
      setShowModal(true);
    } else {
      setLeaderEmail(email);
    }

    // if (await Session.doesSessionExist()) {
    //   if (leaderEmail === '') {
    //     const user = await getSessionUser();
    //     if (user.isRegisterd) {
    //       user.isAdmin ? router.replace('/admin') : router.replace('/dashboard')
    //       return;
    //     }
    //     if (!user.isEligible) {
    //       setShowModal(true);
    //     } else {
    //       setLeaderEmail(user.email);
    //     }
    //   }
    // } else {
    //   router.replace('/login');
    // }
  };

  useEffect(() => {
    checkSession();
  }, [leaderEmail]);

  const onClose = async () => {
    await signOut();
    setShowModal(false);
    window.location.href = '/';
  };

  const stepperOrientation = useBreakpointValue<'horizontal' | 'vertical'>({ base: 'vertical', md: 'horizontal' });

  return (
    <Box color='black' maxWidth='1000px' mx="auto" py={6}>
      <CustomModal
        isOpen={showModal}
        title={'You are not eligible!'}
        description={'You are not eligible to participate in this hackathon. This hackathon is only for 3rd and 4th year B.tech students.'}
        onClose={onClose}
      />

      <Stepper className='Stepper' index={activeStep} size='lg' colorScheme='purple' orientation={stepperOrientation}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator
              color='black'
              sx={{
                '[data-status=complete] &': {
                  background: '#5134A4',
                  borderColor: 'white',
                },
                '[data-status=active] &': {
                  background: 'white',
                  borderColor: 'white',
                },
                '[data-status=incomplete] &': {
                  borderColor: 'white',
                  background: 'transparent'
                },
              }}
            >
              <StepStatus complete={<StepIcon />} incomplete={<Text color="white" fontSize="20px" fontWeight="600" fontFamily="Montserrat, sans-serif">{index + 1}</Text>} active={<Text fontSize="20px" fontWeight="600" fontFamily="Montserrat, sans-serif">{index + 1}</Text>} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle className='StepTitle'>
                <Text fontSize="1.25rem">{step.description}</Text>
              </StepTitle>
            </Box>
            {activeStep > index && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
      <Flex justifyContent='center'>
        <Box alignContent='center' mt={6}>
          {activeStep === 0 && (
            <Box
              bg="#101232"
              p={6}
              rounded="md"
              maxWidth="520px"
              // mx="auto"
              mt="10"
              color="white"
              h="327px"
              maxHeight="360px"
              borderRadius={8}
              w={{ base: "350px", md: "480px" }}
            >
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="600"
                    fontFamily="Montserrat, sans-serif"
                  >
                    Leaders Email
                  </FormLabel>
                  <InputGroup mt={2}>
                    <Input
                      _hover={{ borderColor: 'grey' }}
                      borderColor='#1D1E37'
                      focusBorderColor='grey'
                      type='email'
                      placeholder='your_rollnumber@iith.ac.in'
                      value={leaderEmail}
                      h="48px"
                      background="#06081A"
                      readOnly
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="600"
                    fontFamily="Montserrat, sans-serif"
                  >
                    Enter Leaders name
                  </FormLabel>
                  <InputGroup mt={2}>
                    <Input
                      _hover={{ borderColor: 'grey' }}
                      borderColor='#1D1E37'
                      focusBorderColor='grey'
                      type='text'
                      placeholder='John Doe'
                      value={leaderName}
                      onChange={handleNameChange}
                      h="48px"
                      background="#06081A"
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  mt={5}
                  background="#5134A4"
                  colorScheme="#5134A4"
                  variant="solid"
                  flex={1}
                  isDisabled={leaderEmail.trim() === '' || leaderName.trim() === ''}
                  h="48px"
                  fontSize="1.25rem"
                  fontWeight="500"
                  fontFamily="Montserrat, sans-serif"
                  w="199px"
                  mx="auto"
                  minHeight="48px"
                  borderRadius={8}
                  onClick={handleFirstNext}
                >
                  Next
                </Button>
              </Stack>
            </Box>
          )}
          {activeStep === 1 && (
            <Box
              bg="#101232"
              p={6}
              rounded="md"
              maxWidth="520px"
              mx="auto"
              mt="10"
              color="white"
              h="210px"
              maxHeight="300px"
              borderRadius={8}
              w={{ base: "350px", md: "480px" }}
            >
              <Stack spacing={3}>
                <FormControl isInvalid={teamNameError !== ''}>
                  <FormLabel
                    fontSize="1rem"
                    fontWeight="600"
                    fontFamily="Montserrat, sans-serif"
                  >Enter team name</FormLabel>
                  <InputGroup mt={3}>
                    <Input
                      _hover={{ borderColor: 'grey' }}
                      borderColor='#1D1E37'
                      focusBorderColor='grey'
                      type='text'
                      placeholder='ABC'
                      value={teamName}
                      onChange={handleTeamNameChange}
                      h="48px"
                      background="#06081A"
                    />
                  </InputGroup>
                  {teamNameError != '' && <FormErrorMessage>{teamNameError}</FormErrorMessage>}
                </FormControl>
                <Stack direction="row" spacing={4} mt={4}>
                  <Button
                    background="#5134A4"
                    colorScheme="#5134A4"
                    variant="solid"
                    flex={1}
                    h="48px"
                    fontSize="1.25rem"
                    fontWeight="500"
                    fontFamily="Montserrat, sans-serif"
                    w="199px"
                    onClick={handleBack}
                    borderRadius={8}
                  >
                    Back
                  </Button>
                  <Button
                    background="#5134A4"
                    colorScheme="#5134A4"
                    variant="solid"
                    flex={1}
                    isDisabled={teamName.trim() === ''}
                    h="48px"
                    fontSize="1.25rem"
                    fontWeight="500"
                    fontFamily="Montserrat, sans-serif"
                    w="199px"
                    onClick={handleSecondNext}
                    borderRadius={8}
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
          {activeStep === 2 && (
            <MembersDataCollectionComponent count={3} teamName={teamName} leaderEmail={leaderEmail} leaderName={leaderName} handleBack={handleBack} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

const regex = /^[a-z]{2}(21|22|23)btech1\d{4}@iith\.ac\.in$/;

const verifyIITHEmail = (email: string) => {
  return regex.test(String(email).toLowerCase());
}

const areEmailsUnique = (emails: string[]): boolean => {
  const emailSet = new Set(emails);
  return emailSet.size === emails.length;
};

function MembersDataCollectionComponent({ count, teamName, leaderName, leaderEmail, handleBack }: { count: number; teamName: string; leaderName: string; leaderEmail: string, handleBack: () => void }) {
  const [membersData, setMembersData] = useState(
    Array.from({ length: count }, () => ({ name: '', email: '' }))
  );
  const [errors, setErrors] = useState(Array(count).fill(''));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDup, setIsOpenDup] = useState<boolean>(false);
  const [isAlreadyOpen, setIsAlreadyOpen] = useState<boolean>(false);
  const [isAlreadyMsg, setIsAlreadyMsg] = useState<string>('');

  const handleMemberChange = async (index: number, field: 'name' | 'email', value: string) => {
    const updatedMembers = [...membersData];
    updatedMembers[index][field] = value;
    setMembersData(updatedMembers);

    // Reset error for the field being changed
    const updatedErrors = [...errors];
    if (field === "email" && verifyIITHEmail(value)) {
      updatedErrors[index] = "";
    }
    setErrors(updatedErrors);
  };


  const handleSubmit = async () => {
    const allEmails = [leaderEmail, ...membersData.map(member => member.email)];

    const updatedErrors = [...errors];
    for (let index = 0; index < count; index++) {
      if (verifyIITHEmail(membersData[index].email.trim())) {
        updatedErrors[index] = '';
      } else {
        console.log(index)
        updatedErrors[index] = 'This email is not valid OR user is not eligible';
      }
    }

    setErrors(updatedErrors)
    if (updatedErrors.some(error => error !== '')) return;

    if (!areEmailsUnique(allEmails)) {
      setIsOpenDup(true)
      return;
    }

    const payload = {
      team_name: teamName,
      members_name: [leaderName, ...membersData.map(member => member.name)],
      members_email: allEmails,
    };
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/team`, payload);
      if (response.status === 226) {
        setIsAlreadyMsg(response.data.message)
        setIsAlreadyOpen(true)
      }
      if (response.status === 200) {
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const placeholders = ["Jane Smith", "Alex Johnson", "Chris Brown", "Taylor Davis", "Morgan Lee", "Casey Kim", "Jamie Miller", "Jordan Taylor"];

  const onClose = async () => {
    setIsOpen(false);
    window.location.href = '/';
  };

  console.log(errors)

  return (
    <Flex width="100%" justifyContent="center">
      <Box
        bg="#101232"
        p={6}
        rounded="md"
        maxWidth="1000px"
        mx="auto"
        mt="10"
        color="white"
        w={{ base: "350px", md: "954px" }}
        minW={{ base: "350px", md: "954px" }}
        borderRadius={8}
      >
        <CustomModal
          isOpen={isOpen}
          title={'Registration Successful'}
          description={'Congratulations, your team has been successfully registered.'}
          time={4}
          onClose={onClose}
        />

        <CustomModal
          isOpen={isAlreadyOpen}
          title={'Registration Error'}
          description={isAlreadyMsg}
          onClose={() => setIsAlreadyOpen(false)}
        />

        <CustomModal
          isOpen={isOpenDup}
          title={'Duplicate Emails'}
          description={'This team contains duplicate email ids, please fill all the team members data correctly.'}
          onClose={() => setIsOpenDup(false)}
        />

        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap={12}>
          {membersData.map((member, index) => (
            <GridItem key={index}>
              <Stack spacing={3}>
                <FormControl isInvalid={!!errors[index]}>
                  <HStack spacing={2}>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="21" cy="21" r="21" fill="#5134A4" />
                      <path
                        d="M21 19C23.2091 19 25 17.2091 25 15C25 12.7909 23.2091 11 21 11C18.7909 11 17 12.7909 17 15C17 17.2091 18.7909 19 21 19Z"
                        fill="#06081A" />
                      <path
                        d="M29 26.5C29 28.985 29 31 21 31C13 31 13 28.985 13 26.5C13 24.015 16.582 22 21 22C25.418 22 29 24.015 29 26.5Z"
                        fill="#06081A" />
                    </svg>
                    <FormLabel
                      mt={2}
                      ml={1}
                      fontSize="1rem"
                      fontWeight="500"
                      fontFamily="Montserrat, sans-serif"
                    >
                      Member {index + 1}
                    </FormLabel>
                  </HStack>
                  <FormLabel
                    mt={5}
                    fontSize="1rem"
                    fontWeight="500"
                    fontFamily="Montserrat, sans-serif"
                  >
                    Enter Email
                  </FormLabel>
                  <InputGroup mt={2}>
                    <Input
                      _hover={{ borderColor: 'grey' }}
                      borderColor='#1D1E37'
                      focusBorderColor='grey'
                      type='text'
                      placeholder='rollnumber@iith.ac.in'
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      h="48px"
                      background="#06081A"
                    />
                  </InputGroup>
                  {errors[index] && <FormErrorMessage>{errors[index]}</FormErrorMessage>}
                </FormControl>
                <FormControl>
                  <FormLabel
                    mt={5}
                    fontSize="1rem"
                    fontWeight="500"
                    fontFamily="Montserrat, sans-serif"
                  >
                    Enter Name
                  </FormLabel>
                  <InputGroup mt={2}>
                    <Input
                      _hover={{ borderColor: 'grey' }}
                      borderColor='#1D1E37'
                      focusBorderColor='grey'
                      type='text'
                      placeholder='John Doe'
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      h="48px"
                      background="#06081A"
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </GridItem>
          ))}
        </Grid>
        <Stack direction="row" spacing={4} mt={8} justify="center">
          <Button
            background="#5134A4"
            colorScheme="#5134A4"
            variant="solid"
            h="48px"
            fontSize="1.25rem"
            fontWeight="500"
            fontFamily="Montserrat, sans-serif"
            w="199px"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            background="#5134A4"
            colorScheme="#5134A4"
            variant="solid"
            h="48px"
            fontSize="1.25rem"
            fontWeight="500"
            fontFamily="Montserrat, sans-serif"
            w="199px"
            isDisabled={membersData.some(member => member.name.trim() === '' || member.email.trim() === '')}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export default RegistrationForm;
