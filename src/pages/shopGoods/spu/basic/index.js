import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, useParams } from 'umi';
import {
  Card,
  Table,
  Descriptions,
  Button,
  Tooltip,
  Space,
  Form,
  DatePicker,
  Select,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import pagination from '@/utils/pagination';
const { Option } = Select;
const spu_basic = ({
  spuDetail,
  id,
  brandList,
  getAllBrand,
  getAllMainCategory,
  getAllCategory,
  mainCategory,
  categoryList,
  getSpuById,
  deleteSpuFromBrand,
  postSpu2Brand,
  deleteSpuFromCategory,
  postSpu2Category,
  putOnshelves,
  putOffshelves,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { name, imageUrl, goodsSn, brand, category } = spuDetail;

  const handleDeleteBrand = async () => {
    await deleteSpuFromBrand({
      shopId: depart_id,
      spuId: id,
      id: brand.id,
    });
    await getSpuById({
      id: id,
    });
  };
  const handleAddBrand = async (value) => {
    console.log(value);
    const { brandId } = value;
    await postSpu2Brand({
      shopId: depart_id,
      spuId: id,
      id: brandId,
    });
    await getSpuById({
      id: id,
    });
  };

  const handleDeleteCategory = async () => {
    await deleteSpuFromCategory({
      shopId: depart_id,
      spuId: id,
      id: category.id,
    });
    await getSpuById({
      id: id,
    });
  };
  const handleAddCategory = async (value) => {
    const { categoryId } = value;
    await postSpu2Category({
      shopId: depart_id,
      spuId: id,
      id: categoryId,
    });
    await getSpuById({
      id: id,
    });
  };
  useEffect(() => {
    getAllBrand({
      page: 1,
      pageSize: 100,
    });
    getAllMainCategory();
  }, []);
  return (
    <Card>
      <Card style={{ padding: 0 }} title="基本信息">
        <Descriptions column={1}>
          <Descriptions.Item label="商品名">{name}</Descriptions.Item>
          <Descriptions.Item label="商品编号">{goodsSn}</Descriptions.Item>
          <Descriptions.Item label="缩略图">
            <img style={{ width: 50, height: 50 }} src={imageUrl}></img>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="品牌信息">
        {brand.id === null ? (
          <Form preserve={false} onFinish={handleAddBrand} layout="inline">
            <Form.Item label="选择品牌" name="brandId">
              <Select style={{ width: 200 }}>
                {brandList.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                新增分类
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Descriptions column={4}>
            <Descriptions.Item label="品牌名">{brand.name}</Descriptions.Item>
            <Descriptions.Item label="细节">{brand.detail}</Descriptions.Item>
            <Descriptions.Item label="品牌图">
              {brand.imageUrl}
            </Descriptions.Item>
            <Descriptions.Item>
              <Button type="danger" onClick={handleDeleteBrand}>
                删除品牌
              </Button>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      <Card title="分类信息">
        {category.id === null ? (
          <Form preserve={false} onFinish={handleAddCategory} layout="inline">
            <Form.Item label="选择大门类">
              <Select
                style={{ width: 200 }}
                onChange={(val) => getAllCategory({ cId: val })}
              >
                {mainCategory.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item label="选择分类" name="categoryId">
              <Select style={{ width: 200 }}>
                {categoryList.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                新增分类
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Descriptions column={4}>
            <Descriptions.Item label="分类名">
              {category.name}
            </Descriptions.Item>
            <Descriptions.Item>
              <Button type="danger" onClick={handleDeleteCategory}>
                删除分类
              </Button>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(spu_basic);
