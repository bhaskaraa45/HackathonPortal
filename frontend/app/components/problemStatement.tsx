import React, { useEffect, useState } from 'react';
import renderProblemData from './renderProblemData';
import makeApiCall from '../api/makeCall';

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
                <p>Loading problem statement...</p>
            ) : jsonData ? (
                renderProblemData(jsonData)
            ) : (
                <p>Error fetching data (or no data available)</p>
            )}
        </div>
    );
};

export default ProblemStatementComponent;
