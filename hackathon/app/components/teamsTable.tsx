import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomModal from "./customModal";
import SignOutModal from "./signOutModal";

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

export function TeamsTable({ tableProp }: FinalProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<number>();

  const handleSeeMembers = (members: string[], emails: string[]) => {
    const membersWithEmails = members.map((member, index) => {
      const leaderTag = index === 0 ? " [LEADER]" : "";
      return `${index + 1}. ${member} <${emails[index]}>${leaderTag}`;
    });
    setSelectedTeamMembers(membersWithEmails);
    onOpen();
  };

  const handlePromoteModal = (id: number) => {
    setSelectedTeam(id)
    setIsPromoteVis(true);
  }

  const onPromoteConfirm = () => {
    setIsPromoteVis(false)
    console.log(`ID: ${selectedTeam}`)
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Name
              </th>
              <th scope="col" className="px-6 py-3">
                Members
              </th>
              <th scope="col" className="px-6 py-3">
                Current Round
              </th>
              <th scope="col" className="px-6 py-3">
                Promote
              </th>
            </tr>
          </thead>
          <tbody>
            {tableProp.map((team, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {team.teamName}
                </th>
                <td className="px-6 py-4">
                  <Button onClick={() => handleSeeMembers(team.membersName, team.membersEmail)} className='underline text-blue-600'>
                    See
                  </Button>
                </td>
                <td className="px-6 py-4">
                  {team.currentRound}
                </td>
                <td className="px-6 py-4">
                  <Button onClick={() => handlePromoteModal(team.teamId)} className='text-blue-600 underline'>
                    Promote
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        description={selectedTeamMembers.join('\n')}
        title="Team Members"
        onClose={onClose}
        isOpen={isOpen}
      />
      <SignOutModal
        isVisible={isPromoteVis}
        title={"Are you sure you want to promote this team to next round?"}
        onClose={()=> {
          setIsPromoteVis(false)
        }}
        onConfirm={onPromoteConfirm}
      />
    </>
  );
}

export default TeamsTable;
