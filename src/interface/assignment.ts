export interface IAssignment {
    title: string,
    uniqueTitle: string
    description: string,
    type: string,
    duration: number,
    tags: [string]
    createdAt: Date,
    deleted: number
}