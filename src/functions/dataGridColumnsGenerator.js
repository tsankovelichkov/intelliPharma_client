import { Divider, Typography } from 'antd';

const { Title,Text } = Typography;


function dataGridColumnsGenerator(columnsArray, typeOfSize, noId) {

    let idObject = { field: 'id', headerName: 'ID', width: 50 }

    let result = columnsArray.map(x => {
        return {
            field: x.field,
            headerName: x.header ? x.header : x.field,
            [typeOfSize === 'flex' ? 'flex' : 'width']: x.size,
            editable: x.editable ? x.editable : false,
            renderCell: (params) => {
                if (x.field === "image" || x.field === "retailCompanyLogo") {
                    return (
                        <div>
                            <img src={params.value} alt="data-grid-img" style={{ whiteSpace: "normal", width: 84, height: x.field === "image" ? 87 : 44, borderRadius: 7 }} />
                        </div>
                    )
                } else if (x.custom) {
                    return x.custom
                } else if (x.function) {
                    let element = x.function(params)
                    return element
                } else if (x.type) {
                    if(x.type === "bold") {
                        return <Text strong style={{whiteSpace:"normal"}}>{params.value}</Text>
                    }
                } else if (x.type) {
                    if(x.type === "bold") {
                        return <Text strong style={{whiteSpace:"normal"}}>{params.value}</Text>
                    }
                }
            }
        }
    })

    if (!noId) {
        result.unshift(idObject)
    }

    return result
}

export default dataGridColumnsGenerator