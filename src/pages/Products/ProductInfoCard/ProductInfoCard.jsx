import "./ProductInfoCard.scss"
import React from 'react'

import { Button, Card, Checkbox, Divider, Input, Typography } from "antd"
import { WifiOutlined } from '@ant-design/icons';
import MainInformationCard from "./MainInformationCard/MainInformationCard";
import PriceHistoryCard from "./PriceHistoryCard/PriceHistoryCard";
import MatchedProductsCard from "./MatchedProductsCard/MatchedProductsCard";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../general-custom-hooks/useFetch";
const { Text } = Typography


const ProductInfoCard = () => {

    let params = useParams()

    const { data, loading, error } = useFetch(`http://localhost:5000/all-products/EPHARMA/${params.id}`)

    return (
        <Card color="white" title="Your Product" className="productInfoCard-page-container">
            <MainInformationCard data={data[0]} />
            <MatchedProductsCard />
        </Card>

    )
}

export default ProductInfoCard