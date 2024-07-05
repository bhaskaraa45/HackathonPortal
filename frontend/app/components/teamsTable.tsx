// import { Button, useDisclosure } from "@chakra-ui/react";
// import React, { useState } from "react";
// import CustomModal from "./customModal";
// import SignOutModal from "./signOutModal";
// import makeApiCall from "../api/makeCall";
// import { useRouter } from "next/router";


// export function TeamsTable({ tableProp }: FinalProp) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
//   const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
//   const [selectedTeam, setSelectedTeam] = useState<number>();
//   const [moreRound, setMoreRound] = useState<boolean>(false);

//   const router = useRouter();

//   const handleSeeMembers = (members: string[], emails: string[]) => {
//     const membersWithEmails = members.map((member, index) => {
//       const leaderTag = index === 0 ? " [LEADER]" : "";
//       return `${index + 1}. ${member} <${emails[index]}>${leaderTag}`;
//     });
//     setSelectedTeamMembers(membersWithEmails);
//     onOpen();
//   };

//   const handlePromoteModal = (id: number, r: number) => {
//     setSelectedTeam(id)
//     if (r > 2) {
//       setMoreRound(true)
//     } else {
//       setIsPromoteVis(true);
//     }
//   }

//   const onPromoteConfirm = async () => {
//     try {
//       const response = await makeApiCall("promote", { method: "POST", body: { "team_id": selectedTeam } });
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsPromoteVis(false)
//     }
//     console.log(`PROMOTED ID: ${selectedTeam}`)
//     router.reload();
//   }

//   return (
//     <>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Team Name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Members
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Current Round
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Promote
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableProp.map((team, index) => (
//               <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {team.teamName}
//                 </th>
//                 <td className="px-6 py-4">
//                   <Button onClick={() => handleSeeMembers(team.membersName, team.membersEmail)} className='underline text-blue-600'>
//                     See
//                   </Button>
//                 </td>
//                 <td className="px-6 py-4">
//                   {team.currentRound}
//                 </td>
//                 <td className="px-6 py-4">
//                   <Button onClick={() => handlePromoteModal(team.teamId, team.currentRound)} className='text-blue-600 underline'>
//                     Promote
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <CustomModal
//         description={selectedTeamMembers.join('\n')}
//         title="Team Members"
//         onClose={onClose}
//         isOpen={isOpen}
//       />
//       <SignOutModal
//         isVisible={isPromoteVis}
//         title={"Are you sure you want to promote this team to next round?"}
//         onClose={() => {
//           setIsPromoteVis(false)
//         }}
//         onConfirm={onPromoteConfirm}
//       />
//       <SignOutModal
//         isVisible={moreRound}
//         title={"This team is already in round 3, they cannot be promoted. Ignore the YES button."}
//         onClose={() => {
//           setMoreRound(false)
//         }}
//         onConfirm={() => { setMoreRound(false) }}
//       />
//     </>
//   );
// }

// export default TeamsTable;

import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, useDisclosure } from '@chakra-ui/react';
import SignOutModal from './signOutModal';
import makeApiCall from '../api/makeCall';
import router from 'next/router';
import CustomModal from './customModal';

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

function TeamsTable({ tableProp }: FinalProp) {
  const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const [moreRound, setMoreRound] = useState<boolean>(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSeeMembers = (members: string[], emails: string[]) => {
    const membersWithEmails = members.map((member, index) => {
      const leaderTag = index === 0 ? " [LEADER]" : "";
      return `${index + 1}. ${member} <${emails[index]}>${leaderTag}`;
    });
    setSelectedTeamMembers(membersWithEmails);
    onOpen();
  };

  const onPromoteConfirm = async () => {
    try {
      const response = await makeApiCall("promote", { method: "POST", body: { "team_id": selectedTeam } });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsPromoteVis(false)
    }
    console.log(`PROMOTED ID: ${selectedTeam}`)
    router.reload();
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

  return (
    <>
      <CustomModal //TODO: change this
        description={selectedTeamMembers.join(' \n\n')}
        title="Team Members"
        onClose={onClose}
        isOpen={isOpen}
      />

      <SignOutModal
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
                <Text onClick={() => { handleSeeMembers(resp.membersName, resp.membersEmail) }} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>SEE</Text>
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



