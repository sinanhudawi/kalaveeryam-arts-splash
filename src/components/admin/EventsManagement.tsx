import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Event {
  id: number;
  name: string;
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: "Event A" },
    { id: 2, name: "Event B" },
  ]);
  const [newEventName, setNewEventName] = useState("");

  const handleAddEvent = () => {
    if (newEventName.trim() === "") return;
    const newEvent = {
      id: events.length + 1,
      name: newEventName,
    };
    setEvents([...events, newEvent]);
    setNewEventName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Add New Event</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="event-name"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="Enter event name"
              />
              <Button onClick={handleAddEvent}>Add Event</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Existing Events</h3>
            <ul className="space-y-2 mt-2">
              {events.map((event) => (
                <li key={event.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span>{event.name}</span>
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

export default EventsManagement;