import { Card, Tabs, PageHeader } from 'antd';
import { useParams, connect, history } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import { useEffect } from 'react';
import Basic from './basic';
import Sku from './sku';
const { TabPane } = Tabs;
const goods_id = ({ getSpuById }) => {
  const { id } = useParams();
  useEffect(() => {
    getSpuById({
      id: id,
    });
    // console.log('fetch new');
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
      <Tabs>
        <TabPane key="basic" tab="基本信息">
          <Basic id={id}></Basic>
        </TabPane>
        <TabPane key="sku" tab="商品规格">
          <Sku id={id}></Sku>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(goods_id);
