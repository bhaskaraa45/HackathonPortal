import React, { useEffect, useState } from "react";

type Team = {
    rank: number;
    name: string;
    currentRound: number;
};

type LeaderboardProps = {
    teams: Team[];
};

const Record: React.FC<Team> = ({ rank, name, currentRound }) => {
    return (
        <tr className="record">
            <td>{rank}</td>
            <td>{name}</td>
            <td>{currentRound}</td>
        </tr>
    );
};

const Table: React.FC<LeaderboardProps> = ({ teams }) => {
    const [data, setData] = useState<Team[]>(teams);

    useEffect(() => {

    }, []);

    return (
        <table className="table">
            <thead className="tableheading">
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Round</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 &&
                    data.map((team) => (
                        <Record
                            key={team.rank}
                            rank={team.rank}
                            name={team.name}
                            currentRound={team.currentRound}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export default Table;
