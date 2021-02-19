import { Card, Tabs } from 'antd';
import Brands from './brands';
import Category from './category';
import Spu from './spu';
const { TabPane } = Tabs;
const goods = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="spu" tab="商品">
          <Spu></Spu>
        </TabPane>
        <TabPane key="brands" tab="品牌">
          <Brands></Brands>
        </TabPane>
        <TabPane key="category" tab="分类">
          <Category></Category>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default goods;
