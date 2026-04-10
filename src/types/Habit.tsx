export type Habit = {
    id:number,
    title:string,
    description:string,
    regularity: string | undefined,
    complete:boolean,
    completedDates: string[],
    lastCompletedDate: string | null
}