import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from 'antd';


const NavbarComponent = (show) => {

    const navigate = useNavigate();
    const handleMenuItemClick = (key) => {
        switch (key) {
          case '1':
            navigate('/bang-dieu-khien'); 
            break;
          case '2':
            navigate('/user'); 
            break;
          case '3':
            navigate('/rank'); 
            break;
          case '4':
            navigate('/'); 
            break;
          default:
            break;
        }
      };

      const items = [
        {
            key: '1',
            icon: <FontAwesomeIcon icon='fa-solid fa-table-columns' />,
            label: 'Bảng điều khiển',
          },
          {
            key: '2',
            icon: <FontAwesomeIcon icon='fa-solid fa-user' />,
            label: 'Quản lý người dùng',
          },
          {
            key: '3',
            icon: <FontAwesomeIcon icon='fa-regular fa-chart-bar' />,
            label: 'Phân loại học',
          },
          {
              key: '4',
              icon: <FontAwesomeIcon icon='fa-solid fa-otter' />,
              label: 'Loài nguy cấp quý hiếm',
          },
      ]

    return (
        <Menu 
          theme="light"
          style={{border:'none'}}
          mode="inline"
          defaultSelectedKeys={['4']}
        >
            {items.map((item) => (
                <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => handleMenuItemClick(item.key)}
                >
                {item.label}
                </Menu.Item>
            ))}
        </Menu>
    )

}

export default NavbarComponent