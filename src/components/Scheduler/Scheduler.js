// /*
//  * @Description: 
//  * @Author: wanghexing
//  * @Date: 2022-01-08 10:10:03
//  * @LastEditors: wanghexing
//  * @LastEditTime: 2022-01-17 09:47:07
//  */
// import React, { Component } from 'react'
// import 'dhtmlx-scheduler';
// import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
// const scheduler = window.scheduler;
// export default class Scheduler extends Component {
//     componentDidMount() {
//         scheduler.skin = 'material';
//         scheduler.config.header = [
//             'day',
//             'week',
//             'month',
//             'date',
//             'prev',
//             'today',
//             'next'
//         ];
//         scheduler.config.hour_date = '%g:%i %A';//y轴时间显示格式
//         scheduler.xy.scale_width = 70;//y轴宽度
//         scheduler.config.details_on_create = true;
//         scheduler.config.details_on_dblclick = true;
//         const { events } = this.props;
//         //初始化
//         scheduler.init(this.schedulerContainer, new Date(Date.now()));
//         scheduler.clearAll();
//         scheduler.parse(events);

//     }
//     shouldComponentUpdate(nextProps) {
//         return this.props.timeFormatState !== nextProps.timeFormatState;
//     }

//     componentDidUpdate() {
//         scheduler.render();
//     }

//     setTimeFormat(state) {
//         scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
//         scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
//     }
//     render() {
//         const { timeFormatState } = this.props;
//         this.setTimeFormat(timeFormatState);
//         return (
//             <div style={{ width: '1000px', height: '900px' }}>
//                 <div
//                     ref={(input) => { this.schedulerContainer = input }}
//                     style={{ width: '100%', height: '100%' }}
//                 ></div>
//             </div>
//         );
//     }
// }
