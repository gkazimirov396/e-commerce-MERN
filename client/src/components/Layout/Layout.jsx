import { useRef } from 'react';

import {
  DownOutlined,
  LogoutOutlined,
  ManOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Space, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link, useSearchParams, useNavigate } from 'react-router-dom';

import { logOut, selectCurrentUser, selectIsLoggedIn } from '@store/authSlice';

import CartButton from '@pages/Cart/components/CartButton/CartButton';
import logo from '@assets/img/logo.png';

import Footer from './Footer';

import './Layout.scss';

const { Header, Content } = Layout;

const dropdownMenu = [
  {
    key: '1',
    label: <Link to="/products">all</Link>,
    icon: <ShoppingOutlined />,
  },
  {
    key: '2',
    label: <Link to="/products?category=male">male</Link>,
    icon: <ManOutlined />,
  },
  {
    key: '3',
    label: <Link to="/products?category=female">female</Link>,
    icon: <WomanOutlined />,
  },
];

const LayoutTeplate = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userData = useSelector(selectCurrentUser);
  const searchRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams({ prod: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = userData?.username ?? '';
  const productQuery = searchParams.get('prod') ?? '';

  const avatarMenu = [
    {
      key: '1',
      label: userName,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => dispatch(logOut()),
    },
  ];

  const filterProductsHandler = () => {
    const searchValue = searchRef.current.value;
    setSearchParams(
      prev => {
        prev.set('prod', searchValue);
        return prev;
      },
      { replace: true }
    ); // TODO: check this
    // setSearchParams({ prod: searchValue });
  };

  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <nav>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="LOGO" />
              </Link>
            </div>
            <div className="search">
              <input
                type="search"
                placeholder="search..."
                autoComplete="off"
                onKeyDown={e =>
                  e.key === 'Enter' && navigate(`/products?prod=${productQuery}`)
                }
                onChange={filterProductsHandler}
                ref={searchRef}
              />
              <Link to={`/products?prod=${productQuery}`}>
                <SearchOutlined className="icon" />
              </Link>
            </div>
            <ul>
              <li>
                <Dropdown
                  menu={{
                    items: dropdownMenu,
                  }}
                >
                  <Space>
                    Products
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </li>
              {isLoggedIn && (
                <li>
                  <Link to="/cart">
                    <CartButton />
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Dropdown
                    menu={{
                      items: avatarMenu,
                    }}
                  >
                    <Avatar
                      className="avatar"
                      size="large"
                      icon={<UserOutlined />}
                    />
                  </Dropdown>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
              {/* TODO: add hamburger menu on smaller screens */}
            </ul>
          </nav>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default LayoutTeplate;
