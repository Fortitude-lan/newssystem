/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2021-12-24 15:16:20
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-11 12:42:01
 */
import React from 'react'
import Scheduler from '../../components/Scheduler';
import Timeline from '../../components/Timeline'
const data = [
    { start_date: '2020-06-10 6:00', end_date: '2020-06-10 8:00', text: 'Event 1', id: 1 },
    { start_date: '2020-06-13 10:00', end_date: '2020-06-13 18:00', text: 'Event 2', id: 2 }
];
const timeDate = [
    { start_date: "2022-01-08 09:00", end_date: "2022-01-08 12:00", text:"Task A-12458", section_id:1},
    { start_date: "2022-01-08 10:00", end_date: "2022-01-08 16:00", text:"Task A-89411", section_id:2},
    { start_date: "2022-01-08 10:00", end_date: "2022-01-08 14:00", text:"Task A-64168", section_id:3},
    { start_date: "2022-01-08 16:00", end_date: "2022-01-08 17:00", text:"Task A-46598", section_id:4},
    { start_date: "2022-01-08 12:00", end_date: "2022-01-08 20:00", text:"Task B-48865", section_id:5},
    { start_date: "2022-01-08 14:00", end_date: "2022-01-08 16:00", text:"Task B-44864", section_id:6},
    { start_date: "2022-01-08 16:30", end_date: "2022-01-08 18:00", text:"Task B-46558", section_id:7},
    { start_date: "2022-01-08 18:30", end_date: "2022-01-08 20:00", text:"Task B-45564", section_id:8},
];
const sections = [
    { key: 1, label: "C#12" },
    { key: 2, label: "C#15" },
    { key: 3, label: "A#23" },
    { key: 4, label: "A#22" },
    { key: 5, label: "C#11" },
    { key: 6, label: "C#21" },
    { key: 7, label: "D#01" },
    { key: 8, label: "D#14" },
]
export default function Login() {

    return (
        <div>
            login
            <Timeline events={timeDate} sections={sections}/>
            {/* <Scheduler events={data} /> */}
        </div>
    )
}
