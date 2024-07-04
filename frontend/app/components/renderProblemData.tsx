import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type JSONData = {
    [key: string]: string | string[];
};

const renderProblemData = (data: JSONData | undefined) => {
    if (!data) {
        return <></>;
    }

    const problemStatement = data['Problem Statement'];
    const otherData = Object.entries(data).filter(([key]) => key !== 'Problem Statement');

    return (
        <Box mt="40px">
            {problemStatement && (
                <div>
                    <Text fontSize={{base: "1.5rem" , md:"2rem" }} fontWeight="semibold" color="white">Problem Statement</Text>
                    <Text mt="12px" fontSize="1.25rem" fontWeight="normal" color="white">{problemStatement}</Text>
                </div>
            )}
            {otherData.map(([key, value]) => (
                <div key={key}>
                    <Text mt="48px" fontSize={{base: "1.5rem" , md:"2rem" }} fontWeight="semibold" color="white" >{key}</Text>
                    {Array.isArray(value) ? (
                        <ul className='problem_list'>
                            {value.map((item, index) => (
                                <li className='problem_points' key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text mt="12px" fontSize="1.25rem" fontWeight="normal" color="white">{value}</Text>
                    )}
                </div>
            ))}
        </Box>
    );
};

export default renderProblemData;
