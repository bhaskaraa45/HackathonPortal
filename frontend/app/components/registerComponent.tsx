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

const RegistrationForm: React.FC = () => {
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
    if (await Session.doesSessionExist()) {
      if (leaderEmail === '') {
        const user = await getSessionUser();
        if (user.isRegisterd) {
          user.isAdmin ? router.replace('/admin') : router.replace('/dashboard')
          return;
        }
        if (!user.isEligible) {
          setShowModal(true);
        } else {
          setLeaderEmail(user.email);
        }
      }
    } else {
      router.replace('/login');
    }
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
                  background: 'purple',
                  borderColor: 'black',
                },
                '[data-status=active] &': {
                  background: 'rgb(80, 95, 191)',
                  borderColor: 'black',
                },
                '[data-status=incomplete] &': {
                  borderColor: 'black',
                },
              }}
            >
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle className='StepTitle'>{step.description}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex justifyContent='center'>
        <Box alignContent='center' width='380px' mt={6}>
          {activeStep === 0 && (
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Leader&apos;s Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </InputLeftElement>
                  <Input color='rgb(90, 90, 90)' _hover={{ borderColor: 'black', cursor: 'not-allowed' }} borderColor='black' focusBorderColor='black' type='email' placeholder='your_rollnumber@iith.ac.in' value={leaderEmail} readOnly />
                </InputGroup>

                <Spacer height='18px'></Spacer>

                <FormLabel>Enter Leader&apos;s Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <svg className="w-4 h-4 text-gray-800" fill="#currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.332 492.332">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <polygon points="435.704,249.504 56.626,249.504 14.185,492.332 478.147,492.332 "></polygon>
                            <circle cx="246.167" cy="103.473" r="103.473"></circle>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </InputLeftElement>
                  <Input
                    _hover={{ borderColor: 'black' }}
                    borderColor={nameError ? 'red.500' : 'black'}
                    focusBorderColor={nameError ? 'red.500' : 'black'}
                    type='text'
                    placeholder='John Doe'
                    value={leaderName}
                    onChange={handleNameChange}
                  />
                </InputGroup>
                {nameError && <Text color='red.500' mt={2}>{nameError}</Text>}
              </FormControl>
              <Spacer height='24px'></Spacer>
              <Button onClick={handleFirstNext} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}
                isDisabled={leaderEmail.trim() === '' || leaderName.trim() === ''}
              >
                NEXT
              </Button>
            </Stack>
          )}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <FormControl isInvalid={teamNameError !== ''}>
                <FormLabel>Enter Team Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' />
                  <Input _hover={{ borderColor: 'black' }} borderColor='black' focusBorderColor='black' type='text' placeholder='ABC' value={teamName} onChange={handleTeamNameChange} />
                </InputGroup>
                {teamNameError != '' && <FormErrorMessage>{teamNameError}</FormErrorMessage>}
              </FormControl>

              <Spacer height='100px'></Spacer>

              <Box alignItems='center' width='400px'>
                <Button width='130px' marginLeft='20px' onClick={handleBack} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
                  BACK
                </Button>
                <Button width='130px' marginLeft='100px' onClick={handleSecondNext} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }} isDisabled={teamName.trim() === ''}>
                  NEXT
                </Button>
              </Box>
            </Stack>
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
  return regex.test(email)
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
  };

  const handleSubmit = async () => {
    const allEmails = [leaderEmail, ...membersData.map(member => member.email)];
    if (!areEmailsUnique(allEmails)) {
      setIsOpenDup(true)
      return;
    }

    //   setErrors(Array(count).fill(''))
    //   // setErrors(membersData.map(member => !areEmailsUnique([leaderEmail, member.email]) ? 'This email is duplicated' : ''));

    //   const updatedErrors = [...errors];
    //   for (let i = 0; i < count; i++) {
    //     for (let j = i + 1; j < count; j++) {
    //       if (membersData[i].email === membersData[j].email) {
    //         updatedErrors[i] = 'This email is duplicated'
    //         updatedErrors[j] = 'This email is duplicated'
    //       }
    //     }
    //   }

    //   setErrors(updatedErrors)

    //   return;
    // }
    const updatedErrors = [...errors];
    for (let index = 0; index < count; index++) {
      if (verifyIITHEmail(membersData[index].email.trim())) {
        updatedErrors[index] = '';
      } else {
        updatedErrors[index] = 'This email is not valid OR user is not eligible';
      }
    }
    setErrors(updatedErrors)
    if (updatedErrors.some(error => error !== '')) return;

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

  return (
    <Stack spacing={2}>
      <CustomModal
        isOpen={isOpen}
        title={'Registraion Successful'}
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

      {membersData.map((member, index) => (
        <Box key={index}>
          <FormControl isInvalid={!!errors[index]}>
            <FormLabel>Enter Member {index + 1}&apos;s Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <svg className="w-4 h-4 text-gray-800" fill="#currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.332 492.332">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <polygon points="435.704,249.504 56.626,249.504 14.185,492.332 478.147,492.332 "></polygon>
                        <circle cx="246.167" cy="103.473" r="103.473"></circle>
                      </g>
                    </g>
                  </g>
                </svg>
              </InputLeftElement>
              <Input
                _hover={{ borderColor: 'black' }}
                borderColor={'black'}
                focusBorderColor={'black'}
                type='text'
                placeholder={placeholders[index]}
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!errors[index]}>
            <FormLabel>Enter Member {index + 1}&apos;s Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </InputLeftElement>
              <Input
                _hover={{ borderColor: 'black' }}
                borderColor={'black'}
                focusBorderColor='black'
                type='email'
                placeholder='rollnumber@iith.ac.in'
                value={member.email}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              />
            </InputGroup>
            {errors[index] && <FormErrorMessage>{errors[index]}</FormErrorMessage>}
          </FormControl>

          <div style={{ height: '18px' }}></div>
        </Box>
      ))}

      <Box alignItems='center' width='400px'>
        <Button width='130px' marginLeft='20px' onClick={handleBack} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
          BACK
        </Button>
        <Button onClick={handleSubmit} width='130px' marginLeft='100px' paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }} isDisabled={membersData.some(member => member.name.trim() === '' || member.email.trim() === '')}>
          SUBMIT
        </Button>
      </Box>
    </Stack>
  );
}

export default RegistrationForm;
