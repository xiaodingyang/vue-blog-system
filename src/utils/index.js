import store from "@/store";

export const getImg = (key)=> {
    const imgList = store.getters.imgList
    let bgImg = ''
    imgList.forEach((item) => {
        if (item.imgKey === key) {
            bgImg = item.imgList
        }
    })
    return bgImg
}

export const getQuery=(str)=>{
    let obj = {}
    str.split('&').forEach(item=>{
        obj[item.split('=')[0]] = item.split('=')[1]
    })
    return obj
}