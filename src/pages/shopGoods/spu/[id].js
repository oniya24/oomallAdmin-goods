import { Card, Tabs } from 'antd';
import { useParams, connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import Basic from './basic';
import Sku from './sku';
const { TabPane } = Tabs;
const goods_id = () => {
  const { id } = useParams();
  return (
    <Card style={{ height: '100%', width: '100%' }}>
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
