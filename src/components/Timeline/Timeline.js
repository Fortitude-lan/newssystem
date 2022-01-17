/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-01-09 15:30:24
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-13 17:00:17
 */
import React, { Component } from 'react'
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_timeline'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
// import "./css/index.less";   
const scheduler = window.scheduler
export default class Timeline extends Component {

    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            // "day",
            // "week",
            // "month",
            "timeline",
            "date",
            "prev",
            "today",
            "next"
        ]
        scheduler.locale.labels.timeline_tab = "Timeline";//设置标签的标签
        scheduler.locale.labels.section_custom = "Section";
        scheduler.templates.timeline_scalex_class = function(date){
            return "qqqqq";
        };
        //===============
        //Configuration
        //===============

        //y轴
        var sections = [
            { key: 1, label: "C#12" },
            { key: 2, label: "C#15" },
            { key: 3, label: "A#23" },
            { key: 4, label: "A#22" },
            { key: 5, label: "C#11" },
            { key: 6, label: "C#21" },
            { key: 7, label: "D#01" },
            { key: 8, label: "D#14" },
        ];

        // scheduler.serverList("sections", [
        //     { key: 1, label: "C#12" },
        //     { key: 2, label: "C#15" },
        //     { key: 3, label: "A#23" },
        //     { key: 4, label: "A#22" },
        //     { key: 5, label: "C#11" },
        //     { key: 6, label: "C#21" },
        //     { key: 7, label: "D#01" },
        //     { key: 8, label: "D#14" },
        // ]);
        //创建时间线
        scheduler.createTimelineView({
            name: "timeline",
            x_unit: "hour",//格子时间单位 minute
            x_date: "%H:%i",//时间格式 '%g:%i %A'[01：30 AM(12制小时)]
            x_step: 1,//时间间隔 60
            x_size: 15,//格子数量
            x_start: 8, //开始位置的格子序号
            x_length: 24,//滚动时间间隔
            y_unit: sections,//scheduler.serverList("sections"),//纵坐标
            y_property: "section_id",//数据对应的y轴id
            // section_autoheight: false,//是否启用单元格的自动高度调整 当false情况采用dy宽度
            dx: 70,//列宽
            dy: 50,//列高
            event_dy: 50,//事件高度
            render: "bar",
            // scrollable: true,
            // column_width: 30,
            // scroll_position: new Date(Date.now()),
        });

        var timeline = scheduler.matrix.timeline;
        console.log(timeline);
        //===============
        //Data loading
        //===============
        scheduler.config.lightbox.sections = [
            { name: "描述", height: 50, map_to: "text", type: "textarea", focus: true },
            { name: "教室名称", height: 30, type: "select", options: sections, map_to: "section_id" },
            { name: "时间", height: 72, type: "time", map_to: "auto" }
        ];

        scheduler.init('scheduler_here', new Date(Date.now()), "timeline");
        scheduler.parse([
            { start_date: "2022-01-09 09:00", end_date: "2022-01-09 12:00", text: "Task A-12458", section_id: 1 },
            { start_date: "2022-01-09 10:00", end_date: "2022-01-09 16:00", text: "Task A-89411", section_id: 2 },
            { start_date: "2022-01-09 10:00", end_date: "2022-01-09 14:00", text: "Task A-64168", section_id: 3 },
            { start_date: "2022-01-09 16:00", end_date: "2022-01-09 17:00", text: "Task A-46598", section_id: 4 },
            { start_date: "2022-01-09 12:00", end_date: "2022-01-09 20:00", text: "Task B-48865", section_id: 5 },
            { start_date: "2022-01-09 14:00", end_date: "2022-01-09 16:00", text: "Task B-44864", section_id: 6 },
            { start_date: "2022-01-09 16:30", end_date: "2022-01-09 18:00", text: "Task B-46558", section_id: 7 },
            { start_date: "2022-01-09 18:30", end_date: "2022-01-09 20:00", text: "Task B-45564", section_id: 8 },
        ]);
        scheduler.attachEvent("onClick", function (id, e) {
            scheduler.showLightbox(id);
            console.log('zzz');
            return true;
        });
    }

    render() {
        return (
            <div >
                <div id="scheduler_here" className="dhx_cal_container" style={{ width: '100%', height: '100%' }}>
                    <div className="dhx_cal_navline">
                        <div className="dhx_cal_prev_button">&nbsp;</div>
                        <div className="dhx_cal_next_button">&nbsp;</div>
                        <div className="dhx_cal_today_button" />
                        <div className="dhx_cal_date" />
                        <div className="dhx_cal_tab" name="week_tab" style={{ right: "140px" }} />
                        <div className="dhx_cal_tab" name="timeline_tab" style={{ right: '280px' }} />
                    </div>
                    <div className="dhx_cal_header">
                    </div>
                    <div className="dhx_cal_data">
                    </div>
                </div>
                {/* <div
                     ref={(input) => { this.schedulerContainer = input }}
                     style={{ width: '100%', height: '100%' }}
                 >
                 </div>  */}
            </div >
        );
    }
}
