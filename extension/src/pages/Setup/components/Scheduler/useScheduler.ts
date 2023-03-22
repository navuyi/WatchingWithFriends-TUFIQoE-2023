import { ChangeEvent, useState } from "react"
import { get_local_datetime } from "../../../../utils/time_utils"
import { useExperimentStart } from "../../hooks/useExperimentStart"


export type T_TIME = {
    hours: string | null
    minutes: string | null
}

export const useScheduler = () => {
    const {start_experiment} = useExperimentStart()
    const [scheduled, setScheduled] = useState(false)
    const [time, setTime] = useState<T_TIME>({hours: null, minutes: null})
    const [progress, setProgress] = useState<number>(0)

    let interval : ReturnType<typeof setInterval>;

    const init = () => {
        const now = new Date()
        setTime({
            hours: now.getHours().toString().padStart(2, "0"),
            minutes: now.getMinutes().toString().padStart(2, "0")
        })
    }

    const handle_time_change = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const [hours, minutes] = value.split(":")

        setTime({
            hours, minutes
        })
    }

    const handle_schedule = () => {
        
        // Validate config
        // Validate setup form
        // Validate server connection..
        // ...before scheduling

        // Get current moment
        const now = new Date()
        // Get scheduled time
        let scheduled = new Date(new Date().setHours(Number(time.hours)))
        scheduled = new Date(scheduled.setMinutes(Number(time.minutes)))
        scheduled = new Date(scheduled.setSeconds(0))
        scheduled = new Date(scheduled.setMilliseconds(0))

        console.log(scheduled)

        if(scheduled < now){
            window.alert("Cant schedule to the past")
            return
        }

        const total = (scheduled.getTime() - now.getTime()) // miliseconds until start
        let count = 0
        interval = setInterval(() => {
            count += 100
            const progress = (count/total)*100
            if(progress >= 100){
                setProgress(100)
                clearInterval(interval)
                start_experiment()
                return
            }
            setProgress(progress)
            
        }, 100)

        setScheduled(true)
    }



    return {
        init,
        handle_schedule,
        handle_time_change,
        scheduled,
        time,
        progress
    }
}