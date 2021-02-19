import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, useParams } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  DatePicker,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import pagination from '@/utils/pagination';

const spu_basic = ({
  spuDetail,
  id,
  getSpuById,
  deleteSpuFromBrandReq,
  postSpu2BrandReq,
  deleteSpuFromCategoryReq,
  postSpu2CategoryReq,
}) => {
  return (
    <Card>
      <div>基础信息</div>
      <div>
        品牌信息
        <Button type="primary">新增品牌</Button>
        <Button type="danger">删除品牌</Button>
      </div>
      <div>
        分类信息
        <Button type="primary">新增分类</Button>
        <Button type="danger">删除分类</Button>
      </div>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(spu_basic);
