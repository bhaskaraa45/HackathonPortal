import { Heading } from '@chakra-ui/react';
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
        <div>
            {problemStatement && (
                <div>
                    <Heading className='problem_heading'>Problem Statement</Heading>
                    <div className='statement'>{problemStatement}</div>
                </div>
            )}
            {otherData.map(([key, value]) => (
                <div key={key}>
                    <Heading className='problem_heading'>{key}</Heading>
                    {Array.isArray(value) ? (
                        <ul className='problem_list'>
                            {value.map((item, index) => (
                                <li className='problem_points' key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='statement'>{value}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default renderProblemData;
