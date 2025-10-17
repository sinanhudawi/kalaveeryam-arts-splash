import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MediaUpload = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Upload Image or File</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Input id="media-file" type="file" />
              <Button>Upload</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaUpload;