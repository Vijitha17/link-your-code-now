import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  FileText, 
  Package, 
  ListOrdered,
  Plus,
  Search,
  FileEdit
} from "lucide-react";
import PurchaseRequestList from "@/components/purchase/PurchaseRequestList";
import PurchaseOrderList from "@/components/purchase/PurchaseOrderList";
import PurchaseItemList from "@/components/purchase/PurchaseItemList";
import PurchaseOrderForm from "@/components/purchase/PurchaseOrderForm";
import PurchaseItemForm from "@/components/purchase/PurchaseItemForm";
import { useNavigate } from "react-router-dom";

const PurchaseManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreatePurchaseRequest = () => {
    setIsCreatingRequest(true);
  };
  
  const handleCancelRequest = () => {
    setIsCreatingRequest(false);
  };

  const handleCreatePurchaseOrder = () => {
    setIsCreatingOrder(true);
  };

  const handleCancelOrder = () => {
    setIsCreatingOrder(false);
  };

  const handleCreatePurchaseItem = () => {
    setIsCreatingItem(true);
  };

  const handleCancelItem = () => {
    setIsCreatingItem(false);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Purchase Management</h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search purchases..." 
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                />
              </div>
              
              {/* Conditional button based on active tab and creation state */}
              {!isCreatingOrder && !isCreatingItem && !isCreatingRequest && activeTab === "orders" && (
                <Button onClick={handleCreatePurchaseOrder}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Purchase Order
                </Button>
              )}
              {!isCreatingOrder && !isCreatingItem && !isCreatingRequest && activeTab === "items" && (
                <Button onClick={handleCreatePurchaseItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Purchase Item
                </Button>
              )}
              {!isCreatingOrder && !isCreatingItem && !isCreatingRequest && activeTab === "requests" && (
                <Button onClick={handleCreatePurchaseRequest}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Purchase Request
                </Button>
              )}
              
              {/* Cancel buttons for different creation modes */}
              {isCreatingOrder && (
                <Button variant="outline" onClick={handleCancelOrder}>
                  Cancel
                </Button>
              )}
              {isCreatingItem && (
                <Button variant="outline" onClick={handleCancelItem}>
                  Cancel
                </Button>
              )}
              {isCreatingRequest && (
                <Button variant="outline" onClick={handleCancelRequest}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          {/* Conditional rendering based on what we're creating */}
          {isCreatingOrder ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create Purchase Order</h2>
              <PurchaseOrderForm onCancel={handleCancelOrder} />
            </div>
          ) : isCreatingItem ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add Purchase Item</h2>
              <PurchaseItemForm onCancel={handleCancelItem} />
            </div>
          ) : isCreatingRequest ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create Purchase Request</h2>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Department
                    </label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="supplies">Supplies</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="requestedBy" className="text-sm font-medium">
                      Requested By
                    </label>
                    <input
                      id="requestedBy"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="items" className="text-sm font-medium">
                      Items Required
                    </label>
                    <textarea
                      id="items"
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Enter items (one per line with quantity)"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="justification" className="text-sm font-medium">
                      Justification
                    </label>
                    <textarea
                      id="justification"
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Explain why these items are needed"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="estimatedCost" className="text-sm font-medium">
                      Estimated Cost
                    </label>
                    <input
                      id="estimatedCost"
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter estimated cost"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="requiredBy" className="text-sm font-medium">
                      Required By (Date)
                    </label>
                    <input
                      id="requiredBy"
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelRequest}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="orders" className="space-y-4" onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="orders" className="flex items-center">
                  <ListOrdered className="h-4 w-4 mr-2" />
                  Purchase Orders
                </TabsTrigger>
                <TabsTrigger value="items" className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Purchase Items
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Purchase Requests
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="space-y-4">
                <PurchaseOrderList />
              </TabsContent>
              
              <TabsContent value="items" className="space-y-4">
                <PurchaseItemList />
              </TabsContent>
              
              <TabsContent value="requests" className="space-y-4">
                <PurchaseRequestList />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default PurchaseManagement;