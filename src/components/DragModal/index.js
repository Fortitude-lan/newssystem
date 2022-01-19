/*
 * @Description: Modal--可拖拽
 * @Author: wanghexing
 * @Date: 2022-01-19 15:39:53
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-01-19 15:40:13
 */
"use strict";

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import DragM from "../DragM";
import { Modal } from "antd";

class BuildTitle extends React.Component {
  updateTransform = (transformStr) => {
    this.modalDom.style.transform = transformStr;
  };
  componentDidMount() {
    const modalList = document.getElementsByClassName("ant-modal"); //modal的class是ant-modal
    this.modalDom = modalList[modalList.length - 1];
  }
  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div>{title}</div>
      </DragM>
    );
  }
}

export default class DragModal extends React.Component {
  static propTypes = {
    drag: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    modeless: PropTypes.bool
  };

  static defaultProps = {
    drag: true,
    destroyOnClose: true,
    modeless: false // 非模态
  };

  render() {
    const { drag, visible, modeless, title, mask, destroyOnClose, wrapClassName, children, ...restProps } = this.props;

    //是否可拖拽
    const _title = title && drag ? <BuildTitle visible={visible} title={title} /> : title;
    return (
      <Modal
        centered
        visible={visible}
        title={_title}
        destroyOnClose={destroyOnClose}
        mask={modeless ? false : mask}
        wrapClassName={classNames(wrapClassName, {
          ["ly-modeless"]: modeless
        })}
        {...restProps}
      >
        {children}
      </Modal>
    );
  }
}
