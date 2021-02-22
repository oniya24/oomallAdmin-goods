import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
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
import { mapStateToProps, mapDispatchToProps } from '@/models/Coupon';
import pagination from '@/utils/pagination';
const coupon_invalid = ({
  invalidCouponList,
  invalidCouponTotal,
  invalidCouponPage,
  invalidCouponPageSize,
  getAllInvalidCouponActivity,
  saveInvalidPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '活动图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '优惠时间',
        dataIndex: 'couponTime',
        key: 'couponTime',
      },
      // {
      //   title: '操作',
      //   key: 'operation',
      //   dataIndex: 'operation',
      //   render: (text, record) => {
      //     const { state, id } = record
      //     return (
      //       <Space>
      //         <Button type="primary" onClick={() => handleModifyCoupon(record)}>
      //           修改活动信息
      //         </Button>
      //         <Button type="ghost" onClick={() => history.push(`/coupon/${id}`)}>查看详情</Button>
      //         <Button type="danger" onClick={() => handledeleteCoupon(record)}>
      //           删除活动
      //         </Button>
      //       </Space>
      //     );
      //   },
      // },
    ];
  }, []);
  useEffect(() => {
    getAllInvalidCouponActivity({
      shopId: depart_id,
      page: invalidCouponPage,
      pageSize: invalidCouponPageSize,
    });
    console.log('fetch new');
  }, [invalidCouponPage, invalidCouponPageSize]);
  return (
    <Card>
      <Table
        scroll={{ x: true }}
        pagination={pagination(invalidCouponTotal, saveInvalidPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={invalidCouponList}
      ></Table>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(coupon_invalid);
