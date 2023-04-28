import React, { useState } from 'react'

import { Checkbox } from "@mui/material";
import requests from '../../services/requests'
import { useActivateNotification } from '../../contexts/notificationsContext'

const BasicCheckbox = ({
    url,
    defaultValue,
    requestData
}) => {

    let [track, setTrack] = useState(defaultValue)

    let activateNotification = useActivateNotification()


    function onChangeCheckbox(e) {
        let isChecked = e.target.checked
        console.log(isChecked)
        requests.put(url, Object.assign(requestData, { track: isChecked }))
            .then(res => JSON.parse(res))
            .then(res => {
                if (res.updated) {
                    activateNotification('SUCCESS', `Successfully updated!`)
                    setTrack(isChecked)
                } else {
                    activateNotification('ERROR', `You cannot track more than one product from the same retail company!`)
                    isChecked ? setTrack(false) : setTrack(true)
                }
            }).catch(err => {
                activateNotification('SUCCESS', `Technical problem. Please try again later!`)
                isChecked ? setTrack(false) : setTrack(true)
            })
    }

    return (
        <Checkbox checked={track} onChange={(e) => {
            let isChecked = e.target.checked
            console.log(typeof isChecked)
            requests.put(url, {
                track:isChecked,
                ...requestData
            })
                .then(res => JSON.parse(res))
                .then(res => {
                    if (res.updated) {
                        activateNotification('SUCCESS', `Successfully updated!`)
                        setTrack(isChecked)
                    } else {
                        activateNotification('ERROR', `You cannot track more than one product from the same retail company!`)
                        isChecked ? setTrack(false) : setTrack(true)
                    }
                }).catch(err => {
                    activateNotification('SUCCESS', `Technical problem. Please try again later!`)
                    isChecked ? setTrack(false) : setTrack(true)
                })
        }} />
    )
}

export default BasicCheckbox