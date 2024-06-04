import { Box } from '@chakra-ui/react';
import React from 'react';

type Member = {
    name: string;
    email: string;
    isLeader: boolean
};

type MembersListProps = {
    members: Member[]
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {
    return (
        <Box className='handleTeamWidth' >

            <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
                {members.map((user, index) => (
                    <li key={index} className="py-4 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-12 h-12 rounded-full" src={'/placeholder.png'} alt={`${user.name} image`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-lg font-large text-gray-900 truncate dark:text-white">{user.name}</p>
                                <p className="text-md text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                            </div>
                            {/* <div className="hidden md:block" style={{ 'width': '100px' }}>
                            </div> */}
                            <div className={`${user.isLeader ? 'visible' : 'hidden'} inline-flex items-center text-base font-medium text-gray-900 dark:text-white`}>
                                LEADER
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Box>

    );
};

export default MembersList;
