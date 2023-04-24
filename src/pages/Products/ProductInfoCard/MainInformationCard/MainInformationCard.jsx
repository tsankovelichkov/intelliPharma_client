import "./MainInformationCard.scss"
import React, { useEffect, useState } from 'react'

import { Button, Card, Divider, Input, Typography } from "antd"
import { WifiOutlined, CloseCircleOutlined } from '@ant-design/icons';
import requests from "../../../../services/requests";
import { useActivateNotification } from "../../../../contexts/notificationsContext";

const { Text } = Typography


const MainInformationCard = ({
    data
}) => {

    let [track, setTrack] = useState()
    let activateNotification = useActivateNotification()


    useEffect(() => {
        if (data) {
            if (data.track) {
                setTrack(data.track)
            } else {
                setTrack(false)
            }
        }
    }, [data])

    function onClickUntrackButton() {
        requests.put(`http://localhost:5000/all-products/${data.id}/update`, {
            track: false
        })
            .then(res => JSON.parse(res))
            .then(res => {
                if (res.updated) {
                    activateNotification('SUCCESS', `Successfully updated!`)
                } else {
                    activateNotification('SUCCESS', `Successfully updated!`)
                }
            }).catch(err => {
                activateNotification('SUCCESS', `Technical problem. Please try again later!`)
            })
    }

    function onClickTrackButton() {
        requests.put(`http://localhost:5000/all-products/${data.id}/update`, {
            track: true
        })
            .then(res => JSON.parse(res))
            .then(res => {
                if (res.updated) {
                    activateNotification('SUCCESS', `Successfully updated!`)
                } else {
                    activateNotification('SUCCESS', `Successfully updated!`)
                }
            }).catch(err => {
                activateNotification('SUCCESS', `Technical problem. Please try again later!`)
            })
    }


    return (
        <Card type="inner" title="Main information">
            {data
                && <div className="main-information-container">
                    <div className="image-and-track-wrapper">
                        <div className="image-container">
                            <img src={data?.image} style={{ borderRadius: 8, maxHeight: 200, objectFit: "contain" }} width={"100%"} alt="product-card-img" />
                        </div>
                        {track === true &&
                            <Button
                                icon={<CloseCircleOutlined />}
                                style={{ marginTop: 8 }}
                                onClick={onClickUntrackButton}
                                size="large"
                                danger
                                type="primary"
                            >
                                Untrack
                            </Button>
                        }
                        {track === false &&
                            <Button
                                icon={<WifiOutlined />}
                                style={{ marginTop: 8 }}
                                onClick={onClickTrackButton}
                                size="large"
                                type="primary">
                                Track
                            </Button>
                        }
                    </div>
                    <div className="main-info-wrapper">
                        <div className="info-cards-container">
                            <div className="title-container">
                                <Card title="Title" headStyle={{ backgroundColor: "#473D9A", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.title}</Text>
                                </Card>
                            </div>
                            <Divider />
                            <div className="prices-container">
                                <Card title="Product ID" style={{ width: "50%", marginRight: 10 }} headStyle={{ backgroundColor: "#99cfe0", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.productId}</Text>
                                </Card>
                                <Card title="Regular Price" style={{ width: "100%" }} headStyle={{ backgroundColor: "#61a81a", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.regularPrice} lv.</Text>
                                </Card>
                                <Card title="Discount Price" style={{ marginLeft: 10, width: "100%" }} headStyle={{ backgroundColor: "#D22B2B", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.discountPrice ? `${data.discountPrice} lv.` : `-`}</Text>
                                </Card>
                            </div>
                            <Divider />
                            <div className="manufacturer-and-retailCompany-container">
                                <Card title="Manufacturer" style={{ width: "100%" }} headStyle={{ background: "	#E1C16E", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.manufacturer}</Text>
                                </Card>
                                <Card title="Retail Company" style={{ marginLeft: 10, width: "100%" }} headStyle={{ background: "#CD7F32", color: "white" }}>
                                    <Text style={{ fontSize: 20 }}>{data?.retailCompany}</Text>
                                </Card>
                            </div>
                        </div>
                        <div className="input-and-track-container">
                            <Input size="large" addonBefore="Website Link" value={data?.link} />
                        </div>
                    </div>
                </div>
            }
        </Card>
    )
}

export default MainInformationCard