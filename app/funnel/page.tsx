"use client"

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialColumns = {
  leads: {
    name: 'Leads',
    items: [
      { id: 'lead1', content: 'Acme Corp', value: 5000 },
      { id: 'lead2', content: 'TechStart', value: 7500 },
    ]
  },
  qualified: {
    name: 'Qualified',
    items: [
      { id: 'qual1', content: 'MegaCorp', value: 10000 },
    ]
  },
  proposal: {
    name: 'Proposal',
    items: [
      { id: 'prop1', content: 'StartupXYZ', value: 15000 },
    ]
  },
  negotiation: {
    name: 'Negotiation',
    items: []
  },
  closed: {
    name: 'Closed',
    items: []
  },
}

export default function FunnelPage() {
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sales Funnel</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId}>
              <Card>
                <CardHeader>
                  <CardTitle>{column.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px]"
                      >
                        {column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 mb-2 bg-secondary rounded-md"
                              >
                                <div>{item.content}</div>
                                <div className="text-sm text-muted-foreground">${item.value}</div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}