function invisibleColumns() {
    let pharmaciesArr = ["SOPHARMACY", "MEDEA","AFYA", "REMEDIUM", "GALEN", "BENU"]

    let resultArr = {}

    pharmaciesArr.forEach( el => {
        resultArr[`${el} - productId`] = false
        resultArr[`${el} - image`] = false
        resultArr[`${el} - title`] = false
        resultArr[`${el} - manufacturer`] = false
    })

    return resultArr
}

export default invisibleColumns