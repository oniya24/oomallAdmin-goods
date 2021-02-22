import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, useParams, history } from 'umi';
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
  PageHeader,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Coupon';
import pagination from '@/utils/pagination';

const coupon_detail = ({
  couponDetail,
  couponSkusList,
  couponSkusTotal,
  couponSkusPage,
  couponSkusPageSize,
  postModifyActivityRegion,
  deleteCouponSkusRegion,
  getCouponActivitySkusById,
  getCouponActivityById,
  putOnshelvesActivity,
  putOffshelvesActivity,
  saveCouponSkusPagination,
}) => {
  const { id } = useParams();
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  useEffect(() => {
    getCouponActivitySkusById({
      shopId: depart_id,
      id,
    });
    getCouponActivityById({
      shopId: depart_id,
      id,
    });
  }, []);
  const handleAddSku2Coupon = () => {
    // postModifyActivityRegion
  };
  const handledeleteSkusFromCoupon = async ({ id }) => {
    await deleteCouponSkusRegion({
      shopId: depart_id,
      id,
    });
  };
  const handleOnShelves = async ({ id }) => {
    await putOnshelvesActivity({
      shopId: depart_id,
      id,
    });
  };
  const handleOffShelves = async ({ id }) => {
    await putOffshelvesActivity({
      shopId: depart_id,
      id,
    });
  };
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
        title: 'sku编号',
        dataIndex: 'skuSn',
        key: 'skuSn',
      },
      {
        title: 'inventory',
        dataIndex: 'inventory',
        key: 'inventory',
      },
      {
        title: '原价',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
      },
      {
        title: 'disable',
        dataIndex: 'disable',
        key: 'disable',
      },
      {
        title: '现价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state, id } = record;
          return (
            <Space>
              <Button
                type="danger"
                onClick={() => handledeleteSkusFromCoupon(record)}
              >
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card
      style={{ height: '100%', width: '100%' }}
      title={
        <PageHeader
          subTitle="返回列表页"
          style={{ padding: 0 }}
          onBack={() => history.goBack()}
        />
      }
    >
      <Card title="具体信息" size="small">
        {JSON.stringify(couponDetail)}
        <div>
          <span>活动状态</span>
          <Button type="primary" onClick={handleOnShelves}>
            上架活动
          </Button>
          <Button type="primary" onClick={handleOffShelves}>
            下架活动
          </Button>
        </div>
      </Card>
      <Card title="活动商品" size="small">
        <div style={{ margin: 10 }}>
          <Button type="primary" onClick={handleAddSku2Coupon}>
            添加商品
          </Button>
        </div>
        <Table
          scroll={{ x: true }}
          pagination={pagination(couponSkusTotal, saveCouponSkusPagination)}
          rowKey={(record) => record.dataIndex}
          columns={columns}
          dataSource={couponSkusList}
        ></Table>
      </Card>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(coupon_detail);
