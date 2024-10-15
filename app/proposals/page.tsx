"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const proposals = [
  { id: 1, title: 'Website Redesign', customer: 'Acme Corp', value: 5000, status: 'Pending', createdAt: '2023-04-01', dueDate: '2023-05-15' },
  { id: 2, title: 'Mobile App Development', customer: 'TechStart', value: 15000, status: 'Accepted', createdAt: '2023-03-15', dueDate: '2023-06-30' },
  { id: 3, title: 'Cloud Migration', customer: 'MegaCorp', value: 25000, status: 'In Progress', createdAt: '2023-04-10', dueDate: '2023-07-31' },
  { id: 4, title: 'SEO Optimization', customer: 'StartupXYZ', value: 3000, status: 'Rejected', createdAt: '2023-03-20', dueDate: '2023-04-30' },
]

export default function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('title')
  const [selectedProposal, setSelectedProposal] = useState(null)

  const filteredProposals = proposals.filter(proposal =>
    (proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || proposal.status === statusFilter)
  ).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'value') return b.value - a.value
    if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    return 0
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Proposals</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input
            placeholder="Search proposals..."
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Create Proposal</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal.id} onClick={() => setSelectedProposal(proposal)} className="cursor-pointer">
                  <TableCell>{proposal.title}</TableCell>
                  <TableCell>{proposal.customer}</TableCell>
                  <TableCell>${proposal.value.toLocaleString()}</TableCell>
                  <TableCell>{proposal.status}</TableCell>
                  <TableCell>{proposal.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          {selectedProposal && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedProposal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Customer:</strong> {selectedProposal.customer}</p>
                <p><strong>Value:</strong> ${selectedProposal.value.toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedProposal.status}</p>
                <p><strong>Created At:</strong> {selectedProposal.createdAt}</p>
                <p><strong>Due Date:</strong> {selectedProposal.dueDate}</p>
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