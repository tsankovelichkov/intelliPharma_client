import React, { useState } from 'react'

import { Checkbox } from "@mui/material";
import requests from '../../services/requests'
import { useActivateNotification } from '../../contexts/notificationsContext'

const TrackCheckbox = ({
    url,
    defaultValue,
    requestData,
    isResponseSuccess,
}) => {

    let [track, setTrack] = useState(defaultValue)

    let activateNotification = useActivateNotification()


    function onChangeCheckbox(e) {
        let isChecked = e.target.checked
        requests.put(url,requestData ? {
            track: isChecked,
            ...requestData
        } : {
            track: isChecked,
        })
            .then(res => JSON.parse(res))
            .then(res => {
                if (res.updated) {
                    activateNotification('SUCCESS', `Successfully updated!`)

                    if(isResponseSuccess) {
                        isResponseSuccess(true)
                    }
                    setTrack(isChecked)
                } else {
                    if (res.type === "ONLY-ONE-FROM-THE-SAME-RETAIL-COMPANY") {
                        activateNotification('ERROR', `You cannot track more than one product from the same retail company!`)
                    } else {
                        activateNotification('ERROR', `Technical problem. Please try again later!`)
                    }

                    isChecked ? setTrack(false) : setTrack(true)
                }
            }).catch(err => {
                activateNotification('ERROR', `Technical problem. Please try again later!`)
                isChecked ? setTrack(false) : setTrack(true)
            })
    }

    return (
        <Checkbox checked={track} onChange={onChangeCheckbox} />
    )
}

export default TrackCheckbox