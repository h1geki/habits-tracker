import { create } from "zustand";
import type { Habit } from "../types/Habit";

interface HabitStore {
    habits: Habit[],
    totalComplete:number,
    totalCount:number,
    toggleComplete:(id: number) => void,
    saveHabits:(habits:Habit[]) => void,
    addHabit:(habit:Omit<Habit, 'id' | 'complete' | 'completedDates' | 'lastCompletedDate'>) => void,
    deleteHabit:(habitId:number) => void,
    getHabits:() => void,
    toggleDate: (habitId: number, date: Date) => void
}

export const useHabitStore = create<HabitStore>((set,get) => ({
    habits:[],
    totalComplete:0,
    totalCount:0,
    toggleComplete: (id: number) =>
        set((state) => {
        const today = new Date().toISOString().split('T')[0]

        const updatedHabits = state.habits.map((habit) => {
        if (habit.id !== id) return habit

        const alreadyDone = habit.completedDates.includes(today)

        return {
            ...habit,
            complete: !alreadyDone,
            lastCompletedDate: alreadyDone ? habit.lastCompletedDate : today,
            completedDates: alreadyDone
            ? habit.completedDates.filter(d => d !== today)
            : [...habit.completedDates, today],
        }
        })

        // Сохраняем напрямую, без вызова saveHabits
        localStorage.setItem('habits', JSON.stringify(updatedHabits))

        return {
        habits: updatedHabits,
        totalComplete: updatedHabits.filter(h => h.complete).length,
        totalCount: updatedHabits.length,
        }
    }),
    saveHabits:(habits:Habit[]) => {
        set(()=>{
         localStorage.setItem('habits', JSON.stringify(habits))
         return{
            habits,
            totalComplete:habits.filter(h => h.complete).length,
            totalCount:habits.length
         }   
        })
    },
    addHabit:(habitData) =>
        set((state) => {
            const newHabit: Habit = {
                ...habitData,
                id:Date.now(),
                complete:false,
                completedDates:[],
                lastCompletedDate: null
            };

            const updatedHabits = [...state.habits, newHabit]
            state.saveHabits(updatedHabits)
            return {
                habits:updatedHabits,
                totalComplete:updatedHabits.filter(h => h.complete).length,
                totalCount:updatedHabits.length
            }
        }),
    deleteHabit:(habitId) =>
        set((state) => {
            const updatedHabits = state.habits.filter(h => h.id !== habitId)
            state.saveHabits(updatedHabits)
            return{
                habits:updatedHabits,
                totalComplete:updatedHabits.filter(h => h.complete).length,
                totalCount:updatedHabits.length
            }
        }),
    getHabits:() => 
        set(() => {
            try {
                const savedHabits = localStorage.getItem('habits')
                if (savedHabits) {
                    const today = new Date().toISOString().split('T')[0]
                    const habits: Habit[] = JSON.parse(savedHabits).map((h: Habit) => ({
                    ...h,
                    // Пересчитываем complete на основе сегодняшней даты
                    complete: h.completedDates.includes(today)
                    }))

                    return {
                    habits,
                    totalComplete: habits.filter(h => h.complete).length,
                    totalCount: habits.length
                    }
                }
            return { 
                habits: [], 
                totalComplete: 0, 
                totalCount: 0 
            }
            } catch (error) {
                console.log(error)
                return { habits: [], totalComplete: 0, totalCount: 0 }
            }
        }),
    toggleDate: (habitId: number, date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        
        // Разрешаем отмечать/снимать только сегодняшний день
        if (selectedDate.getTime() !== today.getTime()) {
            console.log("Можно отмечать только сегодняшний день");
            return;
        }
        
        const dateKey = date.toISOString().split('T')[0];
        
        set((state) => {
            const updatedHabits = state.habits.map(habit => {
                if (habit.id !== habitId) return habit;
                
                const hasDate = habit.completedDates.includes(dateKey);
                
                // Если уже выполнено сегодня, ничего не меняем
                if (hasDate) return habit;
                
                return {
                    ...habit,
                    completedDates: [...habit.completedDates, dateKey],
                    lastCompletedDate: dateKey,
                    complete: true // Автоматически отмечаем чекбокс
                };
            });
            
            localStorage.setItem('habits', JSON.stringify(updatedHabits));
            
            return {
                habits: updatedHabits,
                totalComplete: updatedHabits.filter(h => h.complete).length,
                totalCount: updatedHabits.length
            };
        });
    }
}))