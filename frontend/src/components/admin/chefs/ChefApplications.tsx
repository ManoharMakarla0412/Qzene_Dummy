
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

const ChefApplications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chef Applications</CardTitle>
        <CardDescription>Review new chef applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((application) => (
              <TableRow key={application}>
                <TableCell className="font-medium">Applicant {application}</TableCell>
                <TableCell>applicant{application}@example.com</TableCell>
                <TableCell>Italian, French</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-green-600"
                    >
                      <Check className="mr-1 h-4 w-4" /> Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-red-600"
                    >
                      <X className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ChefApplications;
