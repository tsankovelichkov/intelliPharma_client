import { Typography } from "antd";
const { Text } = Typography;


function trackedProductsColumns() {
    let array = ["SOPHARMACY", "MEDEA", "REMEDIUM", "GALEN", "BENU"]
    let colorArr = [
        "trackedProducts-header-light-blue",
        "trackedProducts-header-light-green",
        "trackedProducts-header-light-orange",
        "trackedProducts-header-light-red",
        "trackedProducts-header-light-purple"
    ]

    let resultArr = []

    let columns = array.map((el, i) => {
        return (
            [
                {
                    field: `${el} - productId`, header: `${el} - Product ID`, headerClass: colorArr[i], size: 200
                },
                {
                    field: `${el} - image`, header: `${el} - Image`, headerClass: colorArr[i], function: (params) => {
                        if (params.value) {
                            return (<div>
                                <img src={params.value} alt="data-grid-img" style={{ whiteSpace: "normal", width: 84, height: 87, borderRadius: 7 }} />
                            </div>)
                        }
                    }, size: 200
                },
                {
                    field: `${el} - title`, header: `${el} - Title`,headerClass: colorArr[i], type: "bold", size: 350
                },
                {
                    field: `${el} - regularPrice`, header: `${el} - Regular Price`,headerClass: colorArr[i], function: (params) => {
                        if (params.value) {
                            return <div className="allProducts-regularPrice">{params.value}</div>
                        }
                    }, size: 250
                },
                {
                    field: `${el} - discountPrice`, header: `${el} - Discount Price`,headerClass: colorArr[i], function: (params) => {
                        if(params.value !== undefined) {
                            if(params.value === 0) {
                                return <div className="allProducts-discountPrice ">0.00</div>
                            }else {
                                return <div className="allProducts-discountPrice ">{params.value}</div>
                            }
                        }
                    }, size: 250
                },
                {
                    field: `${el} - manufacturer`, header: `${el} - Manufacturer`,headerClass: colorArr[i], type: "bold", size: 250
                },
            ]
        )
    })

    columns.forEach(arr => {
        resultArr.push(...arr)
    })

    return resultArr
}

export default trackedProductsColumns