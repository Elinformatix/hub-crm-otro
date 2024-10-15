"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Active', company: 'Acme Corp', lastContact: '2023-04-15', value: 5000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', status: 'Inactive', company: 'TechStart', lastContact: '2023-03-20', value: 7500 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555', status: 'Active', company: 'MegaCorp', lastContact: '2023-04-10', value: 10000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '111-222-3333', status: 'Active', company: 'StartupXYZ', lastContact: '2023-04-05', value: 3000 },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const filteredCustomers = customers.filter(customer =>
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || customer.status === statusFilter)
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'value') return b.value - a.value
    return 0
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Add Customer</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} onClick={() => setSelectedCustomer(customer)} className="cursor-pointer">
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>${customer.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          {selectedCustomer && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedCustomer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Status:</strong> {selectedCustomer.status}</p>
                <p><strong>Company:</strong> {selectedCustomer.company}</p>
                <p><strong>Last Contact:</strong> {selectedCustomer.lastContact}</p>
                <p><strong>Value:</strong> ${selectedCustomer.value.toLocaleString()}</p>
                <div className="mt-4">
                  <Button className="mr-2">Edit</Button>
                  <Button variant="outline">Delete</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}