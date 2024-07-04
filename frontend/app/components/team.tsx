import { Box, Flex, Stack, Image, Text, Spacer, Divider } from '@chakra-ui/react';
import React from 'react';

type Member = {
    name: string;
    email: string;
    isLeader: boolean;
};

type MembersListProps = {
    members: Member[];
};

const MembersList: React.FC<MembersListProps> = ({ members }) => {
    return (
        <Flex>
            <Stack direction="column" w="100%">
                {members.map((user, index) => (
                    <React.Fragment key={index}>
                        <Stack mt="20px" mb="24px" direction="row" spacing={0} align="center">
                            <Image src={user.isLeader ? '/icons/leader.svg' : '/icons/person.svg'} boxSize="40px" />
                            <Stack ml="20px" direction="column" spacing={0} flex="1">
                                <Text h="16px" fontSize="1rem" fontWeight="500" color="white">
                                    {user.name}
                                </Text>
                                <Text fontSize="1rem" fontWeight="500" color="#626581" textDecoration="underline">
                                    {user.email}
                                </Text>
                            </Stack>
                            <Spacer />
                            {user.isLeader && (
                                <Text fontSize="1rem" fontWeight="semibold" color="white">
                                    LEADER
                                </Text>
                            )}
                        </Stack>
                        <Divider borderColor="#5134A4" />
                    </React.Fragment>
                ))}
            </Stack>
        </Flex>
    );
};

export default MembersList;
