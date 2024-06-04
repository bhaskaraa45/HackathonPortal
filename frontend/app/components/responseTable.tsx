import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import SignOutModal from "./signOutModal";

type ResponseProp = {
    teamName: string;
    round_one: string | null;
    round_two: string | null;
    round_three: string | null;
    teamId: number;
};

type FinalProp = {
    tableProp: ResponseProp[];
};

export function ResponseTable({ tableProp }: FinalProp) {
    const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<number>();


    const handlePromoteModal = (id: number) => {
        setSelectedTeam(id);
        setIsPromoteVis(true);
    }

    const onPromoteConfirm = () => {
        setIsPromoteVis(false);
        console.log(`ID: ${selectedTeam}`);
        // Add your promote logic here
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
                                Round 1
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Round 2
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Round 3
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
                                    {team.round_one ? (
                                        <a className="text-blue-600" href={team.round_one} target="_blank">
                                            Open
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No Submission</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {team.round_two ? (
                                        <a className="text-blue-600" href={team.round_two} target="_blank">
                                            Open
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No Submission</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {team.round_three ? (
                                        <a className="text-blue-600" href={team.round_three} target="_blank">
                                            Open
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No Submission</span>
                                    )}
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

            <SignOutModal
                isVisible={isPromoteVis}
                title={"Are you sure you want to promote this team to next round?"}
                onClose={() => {
                    setIsPromoteVis(false);
                }}
                onConfirm={onPromoteConfirm}
            />
        </>
    );
}

export default ResponseTable;
