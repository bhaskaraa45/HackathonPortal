import { Heading } from '@chakra-ui/react';
import React from 'react';

type JSONData = {
    [key: string]: string | string[];
};

const renderProblemData = (data: JSONData) => {
    return Object.entries(data).map(([key, value]) => (
        <div key={key} >
            <Heading className='problem_heading'>
                {key}
            </Heading>
            {Array.isArray(value) ? (
                <ul className='problem_list'>
                    {value.map((item, index) => (
                        <li className='problem_points' key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <div className='statement'>{value}</div>
            )}
        </div>
    ));
};

export default renderProblemData;
