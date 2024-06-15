
import styles from "./style.less";
import {Button, Input} from "antd";
import React from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {RequestParamsItem} from "@/pages/User/ApiInfoDetail";

interface RequestParamsTabProps {
  paramItemList:RequestParamsItem[],
  setItemList:(items:RequestParamsItem[]) => void
}

const RequestParamsTab =({paramItemList,setItemList}:RequestParamsTabProps)  => {

  return (
    <div className={styles.paramList}>
      {
        paramItemList.length > 0 && (
          paramItemList.map(item => (
            <div className={styles.paramItem}>
              <Input addonBefore={"参数名"} className={styles.paramName}/>
              <Input addonBefore={"参数值"} className={styles.paramValue}/>
              <DeleteOutlined style={{fontSize: "120%", color: "red"}}/>
            </div>
          ))
        )
      }
      <div className={styles.addItem}>
        <Button type={"dashed"} style={{width: "100%"}}>添加</Button>
      </div>
    </div>
  )
}

export default RequestParamsTab;
