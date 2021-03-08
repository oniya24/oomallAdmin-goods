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
import { dateFormat } from '@/consts/oomall';
import moment from 'moment';
const coupon_valid = ({
  validCouponList,
  validCouponTotal,
  validCouponPage,
  validCouponPageSize,
  getAllValidCouponActivity,
  postCreateCouponActivity,
  putCouponActivityById,
  deleteCouponActivityById,
  saveValidPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  console.log(validCouponList);
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteCoupon = async ({ id }) => {
    await deleteCouponActivityById({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateCoupon = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyCoupon = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    let { beginTime, endTime } = record;
    beginTime = moment(beginTime, dateFormat);
    endTime = moment(endTime, dateFormat);
    form.setFieldsValue({
      ...record,
      beginTime,
      endTime,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      let { beginTime, endTime } = value;
      beginTime = beginTime.format(dateFormat);
      endTime = endTime.format(dateFormat);
      await postCreateCouponActivity({
        shopId: depart_id,
        ...value,
        beginTime,
        endTime,
      });
      await getAllValidCouponActivity({
        shopId: depart_id,
        page: validCouponPage,
        pageSize: validCouponPageSize,
        timeline: 0,
      });
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      let { beginTime, endTime } = value;
      beginTime = beginTime.format(dateFormat);
      endTime = endTime.format(dateFormat);
      await putCouponActivityById({
        shopId: depart_id,
        ...value,
        beginTime,
        endTime,
      });
      await getAllValidCouponActivity({
        shopId: depart_id,
        page: validCouponPage,
        pageSize: validCouponPageSize,
        timeline: 0,
      });
      setModalVisible(false);
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
        render: (text, record) => {
          return <img src={text} style={{ width: 50, height: 50 }}></img>;
        },
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
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state, id } = record;
          return (
            <Space>
              <Button type="primary" onClick={() => handleModifyCoupon(record)}>
                修改活动信息
              </Button>
              <Button
                type="ghost"
                onClick={() => history.push(`/coupon/${id}`)}
              >
                查看详情
              </Button>
              <Button type="danger" onClick={() => handledeleteCoupon(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllValidCouponActivity({
      shopId: depart_id,
      page: validCouponPage,
      pageSize: validCouponPageSize,
      timeline: 0,
    });
  }, [validCouponPage, validCouponPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateCoupon}>
          创建优惠活动
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(validCouponTotal, saveValidPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={validCouponList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        onOk={() =>
          Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify()
        }
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="活动名"
            name="name"
            required
            rules={[{ required: true, message: '此项不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="数量"
            name="quantity"
            required
            rules={[{ required: true, message: '此项不能为空' }]}
          >
            <Input type="number" />
          </Form.Item>
          {Number(modalState) === 0 ? (
            <>
              <Form.Item
                label="数量类型"
                name="quantityType"
                required
                rules={[{ required: true, message: '此项不能为空' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="有效"
                name="validTerm"
                required
                rules={[{ required: true, message: '此项不能为空' }]}
              >
                <Input type="number" />
              </Form.Item>
              {/* <Form.Item
                label="优惠时间"
                name="couponTime"
                required
                rules={[{ required: true, message: '此项不能为空' }]}
              >
                <DatePicker showTime />
              </Form.Item> */}
            </>
          ) : null}
          <Form.Item
            label="开始时间"
            name="beginTime"
            required
            rules={[{ required: true, message: '此项不能为空' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            required
            rules={[{ required: true, message: '此项不能为空' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="策略"
            name="strategy"
            required
            rules={[{ required: true, message: '此项不能为空' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(coupon_valid);
