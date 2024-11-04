import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {Night_City_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = '梁懿豪出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Night City',
          title: '夜之城',
          href: Night_City_LINK,
          blankTarget: true,
        },
        {
          key: 'Terraria',
          title: '泰拉瑞亚',
          href: 'https://terraria.org/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />梁懿豪 Github</>,
          href: 'https://github.com/fearlesslyh',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
