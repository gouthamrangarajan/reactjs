import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Menu from './Menu';

const Test = () => {
  return (
    <div className="test landing">
      <span className="welcomeText">Welcome</span>
      <Menu></Menu>
    </div>
  );
};

export default withDatasourceCheck()(Test);
