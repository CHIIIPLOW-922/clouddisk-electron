const menuList = [
    {
        id: "1",
        name: "全部",
        path: "/all",
        icon: "House"
    },
    {
        id: "2",
        name: "图片",
        path: "/picture",
        icon: "CameraFilled"
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
        icon: "VideoCameraFilled"
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
        icon: "Eleme"
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