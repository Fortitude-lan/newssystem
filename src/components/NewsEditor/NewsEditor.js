/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-02-11 11:03:37
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-02-11 11:31:12
 */
import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
export default function NewsEditor(props) {
    const [editorState, seteditorState] = useState('')
    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState) => seteditorState(editorState)}
            onBlur={() => {
                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />
    )
}
