import "./ProductCard.scss"
import React from 'react';

import { Avatar, Button, Card, Divider, List, Space } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const ProductCard = ({
    title
}) => {
    return (
        <Card className="all" style={{ width: "100%", margin: 4 }} bordered={false}>
            <div className="allMatchedProducts-yourProduct-section">
                <div className='allMatchedProducts-card-info-container'>
                    <div className="allMatchedProducts-avatar-and-track-container">
                        <Avatar shape="square" size={64} src={"https://sopharmacy.bg/media/sys_master/h2d/h95/9012152696862.jpg"} />
                        <div>
                            <Button type="primary" shape="round" icon={<WifiOutlined />} size={"large"} />
                        </div>
                    </div>
                    <div className="allMatchedProducts-card-info-text-container">
                        <Title style={{ margin: 0 }} level={4}>Nivea Soft Интензивно хидратиращ крем x200 мл</Title>
                        <Divider style={{ margin: "16px 0" }} />
                        <div className="allMatchedProducts-card-info-additionalInfo-container">
                            <div className="allMatchedProducts-retailCompany-container">
                                <Text strong>Retail Company:</Text>
                                <Text>SOPHARMACY</Text>
                            </div>
                            <div className="allMatchedProducts-manufacturer-container">
                                <Text strong>Manufacturer:</Text>
                                <Text>NIVEA</Text>
                            </div>
                            <div className="allMatchedProducts-prices-container">
                                <div>
                                    <Text style={{ fontSize: 16 }} type="success" strong>Regular Price:</Text>
                                    <Text style={{ fontSize: 16 }} italic>16.99 lv.</Text>
                                </div>
                                <div>
                                    <Text style={{ fontSize: 16 }} type="danger" strong>Discount Price:</Text>
                                    <Text style={{ fontSize: 16 }} italic>13.99 lv.</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="allMatchedProducts-matchedProducts-section">

            </div>
        </Card>
    )
}

export default ProductCard