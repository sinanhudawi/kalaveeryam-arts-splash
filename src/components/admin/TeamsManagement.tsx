import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Team {
  id: number;
  name: string;
}

const TeamsManagement = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
  ]);
  const [newTeamName, setNewTeamName] = useState("");

  const handleAddTeam = () => {
    if (newTeamName.trim() === "") return;
    const newTeam = {
      id: teams.length + 1,
      name: newTeamName,
    };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Add New Team</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="team-name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name"
              />
              <Button onClick={handleAddTeam}>Add Team</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Existing Teams</h3>
            <ul className="space-y-2 mt-2">
              {teams.map((team) => (
                <li key={team.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span>{team.name}</span>
                  <Button variant="destructive" size="sm">Remove</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsManagement;