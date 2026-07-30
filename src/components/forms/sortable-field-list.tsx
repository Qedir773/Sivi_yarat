"use client";

import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableFieldListProps {
  ids: string[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  children: ReactNode;
}

/** Wraps a list of RHF useFieldArray rows in dnd-kit drag-and-drop reordering. */
export function SortableFieldList({ ids, onReorder, children }: SortableFieldListProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = ids.indexOf(String(active.id));
    const toIndex = ids.indexOf(String(over.id));
    if (fromIndex === -1 || toIndex === -1) return;
    onReorder(fromIndex, toIndex);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export interface DragHandleProps {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
}

interface SortableRowProps {
  id: string;
  /** Wrapper element — "tr" lets this render as a direct <tbody> child
   * instead of an invalid <div>. Defaults to "div" for the CV form lists. */
  as?: "div" | "tr";
  className?: string;
  children: (dragHandle: DragHandleProps) => ReactNode;
}

export function SortableRow({ id, as = "div", className, children }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  const Tag = as;

  return (
    <Tag ref={setNodeRef} style={style} className={className}>
      {children({ attributes, listeners })}
    </Tag>
  );
}
