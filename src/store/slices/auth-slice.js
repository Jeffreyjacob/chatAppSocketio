export const createAuthSlice = (set)=>(
    {
        userInfo:undefined,
        isAuthenticated: false,
        setUserInfo:(userInfo)=> set({userInfo,isAuthenticated:!!userInfo}),
    }
)