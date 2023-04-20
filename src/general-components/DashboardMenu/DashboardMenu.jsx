import "./DashboardMenu.scss"
import React from 'react'

import { PieChartOutlined } from '@ant-design/icons';
import MedicationIcon from '@mui/icons-material/Medication';
import SensorsIcon from '@mui/icons-material/Sensors';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import { Menu } from "antd"
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', '/dashboard', <PieChartOutlined />),
    getItem('Products', 'products', <MedicationIcon />, [
        getItem('All products', '/products/all-products', <SensorsIcon />),
        getItem('Tracked Products', '/products/tracked-products', <JoinLeftIcon />),
    ]),
];


const DashboardMenu = () => {

    let navigate = useNavigate()

    return (
        <div className='dashboardMenu-main-wrapper'>
            <Menu
                defaultSelectedKeys={['/dashboard']}
                onClick={(e) => navigate(`${e.key}`)}
                mode="inline"
                style={{ borderRadius: 12 }}
                items={items}
            />
        </div>
    )
}

export default DashboardMenu