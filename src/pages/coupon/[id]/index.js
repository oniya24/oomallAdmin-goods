import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, useParams, history } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  Select,
  DatePicker,
  Descriptions,
  Modal,
  Input,
  PageHeader,
  Upload,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Coupon';
import pagination from '@/utils/pagination';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

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
  postUploadCouponActivityImg,
  getAllSpu,
  spuList,
}) => {
  const { id } = useParams();
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [addSpuState, setAddSpuState] = useState(false);
  const [activityImageUrl, setActivityImageUrl] = useState(null);
  const {
    name,
    state,
    quantity,
    quantityType,
    validTerm,
    imageUrl,
    strategy,
    couponTime,
  } = couponDetail;
  useEffect(() => {
    getCouponActivitySkusById({
      // shopId: depart_id,
      id,
      page: 1,
      pageSize: 100,
    });
    getCouponActivityById({
      shopId: depart_id,
      id,
    });
    getAllSpu({
      shopId: depart_id,
      page: 1,
      pageSize: 1000,
    });
  }, []);
  const handleAddSku2Coupon = (value) => {
    setAddSpuState(true);
  };
  const handleAddSkuSubmit = async (val) => {
    await postModifyActivityRegion({
      shopId: depart_id,
      id: id,
      ...val,
    });
    await getCouponActivitySkusById({
      // shopId: depart_id,
      id,
      page: 1,
      pageSize: 100,
    });
    setAddSpuState(false);
  };
  const handledeleteSkusFromCoupon = async ({ id }) => {
    await deleteCouponSkusRegion({
      shopId: depart_id,
      id: id,
    });
    await getCouponActivitySkusById({
      // shopId: depart_id,
      id,
      page: 1,
      pageSize: 100,
    });
  };
  const handleOnShelves = async ({}) => {
    await putOnshelvesActivity({
      shopId: depart_id,
      id: id,
    });
    await getCouponActivityById({
      shopId: depart_id,
      id,
    });
  };
  const handleOffShelves = async ({}) => {
    await putOffshelvesActivity({
      shopId: depart_id,
      id: id,
    });
    await getCouponActivityById({
      shopId: depart_id,
      id,
    });
  };
  const beforeUpload = (file) => {
    console.log(file);
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 5;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 5MB!');
    // }
    setActivityImageUrl(file);
    return false;
  };
  const handleUploadImg = async () => {
    const formData = new FormData();
    formData.append('img', activityImageUrl);
    await postUploadCouponActivityImg({
      shopId: depart_id,
      id,
      formData,
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
        title: '商品编号',
        dataIndex: 'goodsSn',
        key: 'goodsSn',
      },
      {
        title: '分类',
        dataIndex: ['category', 'name'],
        key: 'categoryName',
      },
      {
        title: '品牌',
        dataIndex: ['brand', 'name'],
        key: 'brandName',
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
        <Space>
          <Descriptions>
            <Descriptions.Item label="活动名">{name}</Descriptions.Item>
            <Descriptions.Item label="活动状态">{state}</Descriptions.Item>
            <Descriptions.Item label="数量">{quantity}</Descriptions.Item>
            <Descriptions.Item label="数量类型">
              {quantityType}
            </Descriptions.Item>
            <Descriptions.Item label="validTerm">{validTerm}</Descriptions.Item>
            <Descriptions.Item label="策略">{strategy}</Descriptions.Item>
            <Descriptions.Item label="图片">
              <Upload
                name="file"
                id="file"
                beforeUpload={beforeUpload}
                multiple={false}
              >
                {imageUrl ? (
                  <img src={imageUrl} style={{ width: 50, height: 50 }}></img>
                ) : (
                  <Button icon={<UploadOutlined />}>选择图片</Button>
                )}
              </Upload>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                onClick={handleUploadImg}
              >
                上传文件
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </Space>
        <Space>
          <span>活动状态</span>
          <Button type="primary" onClick={handleOnShelves}>
            上架活动
          </Button>
          <Button type="danger" onClick={handleOffShelves}>
            下架活动
          </Button>
        </Space>
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
      <Modal
        destroyOnClose
        visible={addSpuState}
        onCancel={() => setAddSpuState(false)}
        footer={[]}
      >
        <Form preserve={false} onFinish={handleAddSkuSubmit}>
          <Form.Item label="选择商品列表" required name="spuId">
            <Select maxTagCount={3} allowClear>
              {spuList.map((item) => {
                return <Option value={String(item.id)}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(coupon_detail);
