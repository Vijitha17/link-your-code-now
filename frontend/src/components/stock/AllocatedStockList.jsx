import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Edit, 
  Eye,
  Wrench,
  RefreshCw,
  Clock
} from "lucide-react";

const AllocatedStockList = () => {
  const allocatedItems = [
    { 
      id: "ASTK001", 
      name: "Desktop Computer", 
      category: "electronics", 
      quantity: 20, 
      allocatedTo: "Computer Science Dept.",
      location: "Computer Lab 1",
      condition: "good",
      allocationDate: "2025-01-10",
      createdAt: "2025-01-10 10:00:00",
      updatedAt: "2025-01-10 10:00:00"
    },
    { 
      id: "ASTK002", 
      name: "Office Chair", 
      category: "furniture", 
      quantity: 15, 
      allocatedTo: "Administrative Office",
      location: "Admin Block",
      condition: "good",
      allocationDate: "2025-01-15",
      createdAt: "2025-01-15 11:30:00",
      updatedAt: "2025-02-20 09:15:00"
    },
    { 
      id: "ASTK003", 
      name: "Laptop", 
      category: "electronics", 
      quantity: 5, 
      allocatedTo: "Dr. John Smith",
      location: "Principal Office",
      condition: "good",
      allocationDate: "2025-02-05",
      createdAt: "2025-02-05 14:20:00",
      updatedAt: "2025-02-05 14:20:00"
    },
    { 
      id: "ASTK004", 
      name: "Projector", 
      category: "electronics", 
      quantity: 2, 
      allocatedTo: "Physics Department",
      location: "Physics Lab",
      condition: "needs-maintenance",
      allocationDate: "2025-02-10",
      createdAt: "2025-02-10 09:45:00",
      updatedAt: "2025-03-05 16:30:00"
    },
    { 
      id: "ASTK005", 
      name: "Filing Cabinet", 
      category: "furniture", 
      quantity: 3, 
      allocatedTo: "Library",
      location: "Library Office",
      condition: "average",
      allocationDate: "2025-02-15",
      createdAt: "2025-02-15 13:10:00",
      updatedAt: "2025-02-15 13:10:00"
    }
  ];
  
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      electronics: "bg-blue-100 text-blue-800",
      furniture: "bg-amber-100 text-amber-800",
      stationery: "bg-green-100 text-green-800",
      equipment: "bg-purple-100 text-purple-800"
    };
    
    return (
      <Badge variant="outline" className={`${categoryColors[category]} border-none`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };
  
  const getConditionBadge = (condition) => {
    const conditionColors = {
      good: "bg-green-100 text-green-800",
      average: "bg-yellow-100 text-yellow-800",
      "needs-maintenance": "bg-orange-100 text-orange-800",
      "needs-repair": "bg-red-100 text-red-800"
    };
    
    const conditionLabels = {
      good: "Good",
      average: "Average",
      "needs-maintenance": "Needs Maintenance",
      "needs-repair": "Needs Repair"
    };
    
    return (
      <Badge variant="outline" className={`${conditionColors[condition]} border-none`}>
        {conditionLabels[condition]}
      </Badge>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Allocated To</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Allocation Date</TableHead>
            <TableHead className="whitespace-nowrap">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocatedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getCategoryBadge(item.category)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.allocatedTo}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{formatDateTime(item.allocationDate)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(item.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Update Status</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>Send to Service</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Return to Stock</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllocatedStockList;