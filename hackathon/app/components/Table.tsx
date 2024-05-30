import React, { useEffect, useState } from "react";

type Team = {
    rank: number;
    name: string;
    currentRound: string;
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
        // Uncomment the following lines if you want to fetch data from an API
        // const getLeaderboard = async () => {
        //   const res = await axios.get(`${API_URL}/leaderboard`);
        //   setData(res.data);
        // };
        // getLeaderboard();
        // const refresh = setInterval(getLeaderboard, 5000);
        // return () => clearInterval(refresh);
    }, []);

    return (
        <table className="table">
            <thead className="tableheading">
                <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Current Round</th>
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
