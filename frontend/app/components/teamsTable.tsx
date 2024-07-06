
import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, useDisclosure } from '@chakra-ui/react';
import SignOutModal from './signOutModal';
import makeApiCall from '../api/makeCall';
import router from 'next/router';
import CustomModal from './customModal';
import TeamsModal from './teamsModal';

type TeamsProp = {
  teamName: string;
  membersName: string[];
  membersEmail: string[];
  currentRound: number;
  teamId: number;
};

type FinalProp = {
  tableProp: TeamsProp[];
};

interface TeamData {
  name: string;
  members_email: string[];
  members_name: string[];
}

type Member = {
  name: string;
  email: string;
  isLeader: boolean;
};

interface CustomApiError extends Error {
  status?: number;
  data?: any;
}

function TeamsTable({ tableProp }: FinalProp) {
  const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const [moreRound, setMoreRound] = useState<boolean>(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamsProp>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isButtonLoading, setisButtonLoading] = useState<boolean>(false);

  const handleSeeMembers = (team: TeamsProp) => {
    // const membersWithEmails = members.map((member, index) => {
    //   const leaderTag = index === 0 ? " [LEADER]" : "";
    //   return `${index + 1}. ${member} <${emails[index]}>${leaderTag}`;
    // });
    setSelectedTeamMembers(team);
    onOpen();
  };

  const onPromoteConfirm = async () => {
    setisButtonLoading(true)
    try {
      const response = await makeApiCall("promote", { method: "POST", body: { "team_id": selectedTeam } });
      setIsPromoteVis(false)
      router.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsPromoteVis(false)
      if ((error as CustomApiError)?.status as number > 400) {
        setErrorMessage((error as CustomApiError).data.message);
        setIsError(true);
      }

    } finally {
      setisButtonLoading(false)
    }
    // router.reload();
  }

  const handlePromoteModal = (id: number, r: number) => {
    setSelectedTeam(id)
    console.log(r)
    if (r > 2) {
      setMoreRound(true)
    } else {
      setIsPromoteVis(true);
    }
  }

  function makeMembersList(): Member[] {
    const oneTeam = selectedTeamMembers;
    if (!oneTeam) return [];
    return oneTeam.membersName.map((name, index) => ({
      name,
      email: oneTeam.membersEmail[index],
      isLeader: index === 0,
    }));
  }

  return (
    <>
      {/* <CustomModal //TODO: change this
        description={selectedTeamMembers.join(' \n\n')}
        title="Team Members"
        onClose={onClose}
        isOpen={isOpen}
      /> */}

      <CustomModal
        description={errorMessage}
        title="Error!"
        onClose={() => { setIsError(false) }}
        isOpen={isError}
      />

      <TeamsModal
        name={selectedTeamMembers?.teamName ?? ''}
        onClose={onClose}
        isOpen={isOpen}
        members={makeMembersList()} />

      <SignOutModal
        isLoading={isButtonLoading}
        isVisible={isPromoteVis}
        title={"Are you sure you want to promote this team to next round?"}
        onClose={() => {
          setIsPromoteVis(false);
        }}
        onConfirm={onPromoteConfirm}
      />

      <SignOutModal
        isVisible={moreRound}
        title={"This team is already in round 3, they cannot be promoted. Ignore the YES button."}
        onClose={() => {
          setMoreRound(false)
        }}
        onConfirm={() => { setMoreRound(false) }}
      />

      <Box width="100%" mx="auto" p="8" borderRadius="md">
        <VStack spacing="4" width="100%">
          <HStack height="64px" width="100%" justifyContent="space-between" bg="#5134A4" p="4" borderRadius="8px">

            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
              <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Name</Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
              <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Members</Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
              <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Current Round</Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
              <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Promote</Text>
            </Box>
          </HStack>
          {tableProp.map((resp, index) => (
            <HStack
              h="64px"
              // px={8}
              key={index}
              width="100%"
              justifyContent="space-between"
              bg="#101232"
              p="4"
              borderRadius="8px"
              border="2px solid"
              borderColor="#1D1E37"
            >
              <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                <Text fontSize="1rem" fontWeight="semibold" color="white" noOfLines={1}>{resp.teamName}</Text>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                <Text onClick={() => { handleSeeMembers(resp) }} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>SEE</Text>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                  <Text fontSize="1rem" fontWeight="normal" color="white" noOfLines={1}>{resp.currentRound}</Text>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                <Text onClick={() => handlePromoteModal(resp.teamId, resp.currentRound)} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>Promote</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
    </>

  );
};

export default TeamsTable;



