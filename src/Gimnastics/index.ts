import { GYMNASTIC_LIST } from './utils';

interface GymListItem {
    tasks: string[],
    date: Date
}

export default class Gymnastics {

    static list: { [username: string]: GymListItem } = {}

    static createTask = (userName: string) => {
        Gymnastics.list[userName] = {
            tasks: Array.from({length: 3}, () => {
                const randId = Math.floor(Math.random() * GYMNASTIC_LIST.length)
                return GYMNASTIC_LIST[randId];
            }),
            date: new Date()
        }
    }

    static isToday = (someDate: Date) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    static hasTask = (userName: string): boolean => {
        const task = Gymnastics.list[userName];
        return Boolean(task && Gymnastics.isToday(task.date));
    }

    static getTask = (userName: string) => {
        return Gymnastics.list[userName];
    }
}