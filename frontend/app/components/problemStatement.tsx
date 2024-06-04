import React, { useEffect, useState } from 'react';
import renderProblemData from './renderProblemData';
import makeApiCall from '../api/makeCall';

type JSONData = {
    [key: string]: string | string[];
};

const ProblemStatementComponent: React.FC = () => {
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);

        try {
            const resp = await makeApiCall('question', { method: 'GET' });
            const obj = JSON.parse(resp)
            setJsonData(obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

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
