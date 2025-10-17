import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Candidate {
  id: number;
  name: string;
}

const CandidatesManagement = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: "Candidate A" },
    { id: 2, name: "Candidate B" },
  ]);
  const [newCandidateName, setNewCandidateName] = useState("");

  const handleAddCandidate = () => {
    if (newCandidateName.trim() === "") return;
    const newCandidate = {
      id: candidates.length + 1,
      name: newCandidateName,
    };
    setCandidates([...candidates, newCandidate]);
    setNewCandidateName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidates Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Add New Candidate</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="candidate-name"
                value={newCandidateName}
                onChange={(e) => setNewCandidateName(e.target.value)}
                placeholder="Enter candidate name"
              />
              <Button onClick={handleAddCandidate}>Add Candidate</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Existing Candidates</h3>
            <ul className="space-y-2 mt-2">
              {candidates.map((candidate) => (
                <li key={candidate.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span>{candidate.name}</span>
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

export default CandidatesManagement;