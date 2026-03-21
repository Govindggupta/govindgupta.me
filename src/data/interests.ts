export interface Interest {
  label: string
  emoji: string
  colSpan: 1 | 2 | 4
  rowSpan?: 1 | 2
}

export const interests: Interest[] = [
  { label: "Badminton", emoji: "🏸", colSpan: 2 },
  { label: "Cricket", emoji: "🏏", colSpan: 1 },
  { label: "Football", emoji: "⚽", colSpan: 1 },
  { label: "Sketching", emoji: "✏️", colSpan: 1 },
  { label: "Flute", emoji: "🎵", colSpan: 1 },
  { label: "Piano", emoji: "🎹", colSpan: 2 },
  { label: "Classical Music", emoji: "🎶", colSpan: 2 },
  { label: "Gaming", emoji: "🎮", colSpan: 1 },
  { label: "Trekking", emoji: "🥾", colSpan: 1 },
  { label: "Travel", emoji: "✈️", colSpan: 4 },
]
