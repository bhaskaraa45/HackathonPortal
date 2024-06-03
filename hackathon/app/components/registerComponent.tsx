import React, { useState } from 'react';
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
  StepDescription,
  StepNumber,
  StepSeparator,
  useSteps,
  StepIcon,
  InputGroup,
  InputLeftElement,
  Stack,
  Flex,
  InputRightElement,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';

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

  const [leaderEmail, setLeaderEmail] = useState<string>('');
  const [leaderName, setLeaderName] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [members, setMembers] = useState<string[]>(['']);
  const [showOtp, setShowOtp] = React.useState(false);
  const handleShowOtpClick = () => setShowOtp(!showOtp);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setLeaderEmail(e.target.value);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLeaderName(e.target.value);
  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const stepperOrientation = useBreakpointValue<'horizontal' | 'vertical'>({ base: 'vertical', md: 'horizontal' });
  return (
    <Box color='black' maxWidth='1000px' mx="auto" py={6}>
      <Stepper className='Stepper' index={activeStep} size='lg' colorScheme='purple' orientation={stepperOrientation}>
        {steps.map((step, index) => (
          <Step key={index} >
            <StepIndicator color='black'
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
              }}>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle className='StepTitle'>{step.description}</StepTitle>
              {/* <StepDescription className='StepDescription'>{step.description}</StepDescription> */}
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex
        justifyContent='center'
      >
        <Box alignContent='center' width='400px' mt={6}>
          {activeStep === 0 && (
            <Stack spacing={3}>
              <FormControl>
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
                    borderColor='black'
                    focusBorderColor='black'
                    type='text'
                    placeholder='John Doe'
                    value={leaderName}
                    onChange={handleNameChange}
                  />
                </InputGroup>
                <Spacer height='18px'></Spacer>

                <FormLabel>Enter Leader&apos;s Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </InputLeftElement>
                  <Input _hover={{ borderColor: 'black' }} borderColor='black' focusBorderColor='black' type='email' placeholder='your_rollnumber@iith.ac.in' value={leaderEmail} onChange={handleEmailChange} />
                  <InputRightElement width='4.5rem' marginRight='5px'>
                    <Button h='1.75rem' size='sm' color='#2b388f' background='#e2e4ff' _hover={{ background: 'grey', color: 'white' }}>
                      Get OTP
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Spacer height='18px'></Spacer>

                <FormLabel>Enter OTP</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <svg className="w-5 h-5 text-gray-800" aria-hidden="true" fill="#currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Password">
                          <path
                            d="M391,233.9478H121a45.1323,45.1323,0,0,0-45,45v162a45.1323,45.1323,0,0,0,45,45H391a45.1323,45.1323,0,0,0,45-45v-162A45.1323,45.1323,0,0,0,391,233.9478ZM184.123,369.3794a9.8954,9.8954,0,1,1-9.8964,17.1387l-16.33-9.4287v18.8593a9.8965,9.8965,0,0,1-19.793,0V377.0894l-16.33,9.4287a9.8954,9.8954,0,0,1-9.8964-17.1387l16.3344-9.4307-16.3344-9.4306a9.8954,9.8954,0,0,1,9.8964-17.1387l16.33,9.4282V323.9487a9.8965,9.8965,0,0,1,19.793,0v18.8589l16.33-9.4282a9.8954,9.8954,0,0,1,9.8964,17.1387l-16.3344,9.4306Zm108,0a9.8954,9.8954,0,1,1-9.8964,17.1387l-16.33-9.4287v18.8593a9.8965,9.8965,0,0,1-19.793,0V377.0894l-16.33,9.4287a9.8954,9.8954,0,0,1-9.8964-17.1387l16.3344-9.4307-16.3344-9.4306a9.8954,9.8954,0,0,1,9.8964-17.1387l16.33,9.4282V323.9487a9.8965,9.8965,0,0,1,19.793,0v18.8589l16.33-9.4282a9.8954,9.8954,0,0,1,9.8964,17.1387l-16.3344,9.4306Zm108,0a9.8954,9.8954,0,1,1-9.8964,17.1387l-16.33-9.4287v18.8593a9.8965,9.8965,0,0,1-19.793,0V377.0894l-16.33,9.4287a9.8954,9.8954,0,0,1-9.8964-17.1387l16.3344-9.4307-16.3344-9.4306a9.8954,9.8954,0,0,1,9.8964-17.1387l16.33,9.4282V323.9487a9.8965,9.8965,0,0,1,19.793,0v18.8589l16.33-9.4282a9.8954,9.8954,0,0,1,9.8964,17.1387l-16.3344,9.4306Z">
                          </path>
                          <path
                            d="M157.8965,143.9487a98.1035,98.1035,0,1,1,196.207,0V214.147h19.793V143.9487a117.8965,117.8965,0,0,0-235.793,0V214.147h19.793Z">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </InputLeftElement>
                  <Input _hover={{ borderColor: 'black' }} borderColor='black' focusBorderColor='black' type={showOtp ? 'text' : 'password'} placeholder='XXXXXX' />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowOtpClick} color='#2b388f' background='#e2e4ff' _hover={{ background: 'grey', color: 'white' }}>
                      {showOtp ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Spacer height='24px'></Spacer>

              <Button onClick={handleNext} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
                NEXT
              </Button>
            </Stack>

          )}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Enter Team Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    
                  </InputLeftElement>
                  <Input _hover={{ borderColor: 'black' }} borderColor='black' focusBorderColor='black' type='text' placeholder='ABC' value={teamName} onChange={handleTeamNameChange} />
                </InputGroup>
              </FormControl>

              <Spacer height='100px'></Spacer>

              <Box alignItems='center' width='400px'>
                <Button width='130px' marginLeft='20px' onClick={handleBack} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
                  BACK
                </Button>
                <Button width='130px' marginLeft='100px' onClick={handleNext} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
                  NEXT
                </Button>
              </Box>
            </Stack>
          )}
          {activeStep === 2 && (
            <MembersDataCollectionComponent count={3} teamName={teamName} leaderEmail={leaderEmail} leaderName={leaderName} handleBack={handleBack} />
          )
          }
        </Box>
      </Flex >

    </Box >
  );
};

function MembersDataCollectionComponent({ count, teamName, leaderName, leaderEmail, handleBack }: { count: number; teamName: string; leaderName: string; leaderEmail: string, handleBack: () => void }) {
  const [membersData, setMembersData] = useState(
    Array.from({ length: count }, () => ({ name: '', email: '' }))
  );

  const handleMemberChange = (index: number, field: 'name' | 'email', value: string) => {
    const updatedMembers = [...membersData];
    updatedMembers[index][field] = value;
    setMembersData(updatedMembers);
  };

  const handleSubmit = async () => {
    const payload = {
      team_name: teamName,
      members_name: [leaderName, ...membersData.map(member => member.name)],
      members_email: [leaderEmail, ...membersData.map(member => member.email)],
    };

    console.log(payload)

    try {
      const response = await axios.post('http://localhost:8080/team', payload);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Stack spacing={2}>
      {membersData.map((member, index) => (
        <Box key={index}>
          <FormControl>
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
                borderColor='black'
                focusBorderColor='black'
                type='text'
                placeholder='John Doe'
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              />
            </InputGroup>

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
                borderColor='black'
                focusBorderColor='black'
                type='email'
                placeholder='rollnumber@iith.ac.in'
                value={member.email}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <div style={{ height: '18px' }}></div>

        </Box>
      ))}

      <Box alignItems='center' width='400px'>
        <Button width='130px' marginLeft='20px' onClick={handleBack} paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
          BACK
        </Button>
        <Button onClick={handleSubmit} width='130px' marginLeft='100px' paddingX='5px' color='white' background='rgb(58, 73, 167)' _hover={{ background: '#2b388f' }}>
          SUBMIT
        </Button>
      </Box>
    </Stack>
  );
}

export default RegistrationForm;
