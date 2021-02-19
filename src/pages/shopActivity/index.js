import { Card, Tabs } from 'antd';
import Groupon from './groupon';
// import Flashsale from './flashsale';
// import Presale from './presale';
const { TabPane } = Tabs;
const adminManage = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="groupon" tab="团购活动">
          <Groupon></Groupon>
        </TabPane>
        {/* <TabPane key="flashsale" tab="秒杀活动">
          <Flashsale></Flashsale>
        </TabPane>
        <TabPane key="presale" tab="预售活动">
          <Presale></Presale>
        </TabPane> */}
      </Tabs>
    </Card>
  );
};

export default adminManage;
