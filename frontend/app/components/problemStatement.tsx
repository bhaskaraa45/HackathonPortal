import React, { useEffect, useState } from 'react';
import renderProblemData from './renderProblemData';
import makeApiCall from '../api/makeCall';
import { Flex, Spinner, Text } from '@chakra-ui/react';

type JSONData = {
    [key: string]: string | string[];
};

type props = {
    isLoading: boolean
    jsonData: JSONData
};

const ProblemStatementComponent: React.FC<props> = ({ isLoading, jsonData }: props) => {
    return (
        <div>
            {isLoading ? (
                <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                    <Spinner size="xl" />
                </Flex>
            ) : jsonData ? (
                renderProblemData(jsonData)
            ) : (
                <Text color="white">Error fetching data (or no data available)</Text>
            )}
        </div>
    );
};

export default ProblemStatementComponent;
