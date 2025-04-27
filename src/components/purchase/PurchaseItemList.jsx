import React, { useState } from "react";
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
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  Truck,
  AlertCircle,
  X
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Helper function for received status badge
const getReceivedStatusBadge = (receivedDate) => {
  if (!receivedDate) {
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-none">Pending</Badge>;
  }
  return <Badge variant="outline" className="bg-green-100 text-green-800 border-none">Received</Badge>;
};

// View Details Component
const ViewPurchaseItemDetails = ({ item, isOpen, onClose }) => {
  if (!item || !isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not received";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Purchase Item Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Item Name</p>
                  <p className="mt-1">{item.item_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p className="mt-1">{item.category_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Vendor</p>
                  <p className="mt-1">{item.vendor_name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="mt-1">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Unit Price</p>
                  <p className="mt-1">₹{item.unit_cost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Cost</p>
                  <p className="mt-1 font-semibold">₹{(item.quantity * item.unit_cost).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Received Date</p>
                <p className="mt-1">{formatDate(item.received_date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <div className="mt-1">{getReceivedStatusBadge(item.received_date)}</div>
              </div>
              {item.remarks && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Remarks</p>
                  <p className="mt-1">{item.remarks}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Form Component
const EditPurchaseItemForm = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(item || {
    item_name: "",
    category_name: "",
    vendor_name: "",
    quantity: 1,
    unit_cost: 0,
    received_date: null,
    remarks: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, received_date: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Edit Purchase Item</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="purchase_item_id">Purchase Item ID</Label>
            <Input
              id="purchase_item_id"
              name="purchase_item_id"
              value={formData.purchase_item_id}
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item_name">Item Name</Label>
                <Input
                  id="item_name"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category_name">Category</Label>
                <Select
                  value={formData.category_name}
                  onValueChange={(value) => handleSelectChange("category_name", value)}
                  required
                >
                  <SelectTrigger id="category_name">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendor_name">Vendor</Label>
                <Select
                  value={formData.vendor_name}
                  onValueChange={(value) => handleSelectChange("vendor_name", value)}
                  required
                >
                  <SelectTrigger id="vendor_name">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Solutions Ltd">Tech Solutions Ltd</SelectItem>
                    <SelectItem value="Office Supplies Co">Office Supplies Co</SelectItem>
                    <SelectItem value="Lab Equipment Inc">Lab Equipment Inc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit_cost">Unit Price</Label>
                <Input
                  id="unit_cost"
                  name="unit_cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.unit_cost}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Received Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.received_date ? (
                        format(formData.received_date, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.received_date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Any additional remarks"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PurchaseItemList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [purchaseItems, setPurchaseItems] = useState([
    {
      purchase_item_id: 1,
      order_id: "PO-2023-001",
      item_name: "Dell XPS 13 Laptop",
      category_name: "Equipment",
      vendor_name: "Tech Solutions Ltd",
      quantity: 5,
      unit_cost: 89000,
      received_date: "2023-05-20",
      remarks: "For new hires",
      created_at: "2023-05-15 10:30:00"
    },
    {
      purchase_item_id: 2,
      order_id: "PO-2023-001",
      item_name: "HP LaserJet Pro Printer",
      category_name: "Equipment",
      vendor_name: "Tech Solutions Ltd",
      quantity: 2,
      unit_cost: 35000,
      received_date: null,
      remarks: "",
      created_at: "2023-05-15 10:30:00"
    },
    {
      purchase_item_id: 3,
      order_id: "PO-2023-002",
      item_name: "Lab Oscilloscope",
      category_name: "Equipment",
      vendor_name: "Lab Equipment Inc",
      quantity: 3,
      unit_cost: 120000,
      received_date: "2023-05-18",
      remarks: "For physics lab",
      created_at: "2023-05-10 09:15:00"
    },
    {
      purchase_item_id: 4,
      order_id: "PO-2023-003",
      item_name: "Office Chairs",
      category_name: "Furniture",
      vendor_name: "Office Supplies Co",
      quantity: 20,
      unit_cost: 7500,
      received_date: "2023-05-12",
      remarks: "For new office setup",
      created_at: "2023-05-05 14:00:00"
    },
    {
      purchase_item_id: 5,
      order_id: "PO-2023-003",
      item_name: "Stationery Set",
      category_name: "Supplies",
      vendor_name: "Office Supplies Co",
      quantity: 50,
      unit_cost: 250,
      received_date: "2023-05-12",
      remarks: "",
      created_at: "2023-05-05 14:00:00"
    }
  ]);

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    setPurchaseItems(prev => prev.filter(i => i.purchase_item_id !== itemToDelete.purchase_item_id));
    toast({
      title: "Item Deleted",
      description: `Item "${itemToDelete.item_name}" has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = (updatedItem) => {
    setPurchaseItems(prev => prev.map(item => 
      item.purchase_item_id === updatedItem.purchase_item_id 
        ? { ...updatedItem } 
        : item
    ));
    toast({
      title: "Item Updated",
      description: `Item "${updatedItem.item_name}" has been updated.`,
    });
    setIsEditDialogOpen(false);
  };

  const markAsReceived = (item) => {
    setPurchaseItems(prev => prev.map(i => 
      i.purchase_item_id === item.purchase_item_id 
        ? { ...i, received_date: new Date().toISOString().split('T')[0] } 
        : i
    ));
    toast({
      title: "Item Updated",
      description: `Item "${item.item_name}" has been marked as received.`,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Purchase Items</h2>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Received Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseItems.map((item) => (
              <TableRow key={item.purchase_item_id}>
                <TableCell className="font-medium">{item.order_id}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.unit_cost.toLocaleString()}</TableCell>
                <TableCell>
                  {item.received_date ? (
                    new Date(item.received_date).toLocaleDateString()
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-none">
                      Pending
                    </Badge>
                  )}
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
                      <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditItem(item)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Item
                      </DropdownMenuItem>
                      {!item.received_date && (
                        <DropdownMenuItem onClick={() => markAsReceived(item)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Received
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Modal */}
      <ViewPurchaseItemDetails 
        item={selectedItem} 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
      />

      {/* Edit Item Modal */}
      <EditPurchaseItemForm 
        item={selectedItem} 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdateItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the item "{itemToDelete?.item_name}" 
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteItem}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PurchaseItemList;