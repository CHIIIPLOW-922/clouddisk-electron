const menuList = [
    {
        id: "1",
        name: "全部",
        path: "/all",
        icon: "Menu"
    },
    {
        id: "2",
        name: "图片",
        path: "/picture",
        icon: "PictureFilled"
    },
    {
        id: "3",
        name: "文档",
        path: "/officeFile",
        icon: "Files"
    },
    {
        id: "4",
        name: "视频",
        path: "/video",
        icon: "VideoPlay"
    },
    {
        id: "5",
        name: "音乐",
        path: "/music",
        icon: "Headset"
    },
    {
        id: "6",
        name: "其他",
        path: "/other",
        icon: "MoreFilled"
    },
    {
        id: "7",
        name: "回收站",
        path: "/recycle",
        icon: "DeleteFilled"
    }
]




export const getMenuList = () => {
    return menuList
}