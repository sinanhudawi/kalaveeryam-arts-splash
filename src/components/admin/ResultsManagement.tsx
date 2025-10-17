import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Result {
  id: number;
  name: string;
}

const ResultsManagement = () => {
  const [results, setResults] = useState<Result[]>([
    { id: 1, name: "Result A" },
    { id: 2, name: "Result B" },
  ]);
  const [newResultName, setNewResultName] = useState("");

  const handleAddResult = () => {
    if (newResultName.trim() === "") return;
    const newResult = {
      id: results.length + 1,
      name: newResultName,
    };
    setResults([...results, newResult]);
    setNewResultName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Add New Result</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="result-name"
                value={newResultName}
                onChange={(e) => setNewResultName(e.target.value)}
                placeholder="Enter result name"
              />
              <Button onClick={handleAddResult}>Add Result</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Existing Results</h3>
            <ul className="space-y-2 mt-2">
              {results.map((result) => (
                <li key={result.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span>{result.name}</span>
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

export default ResultsManagement;