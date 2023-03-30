import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    // Userin varsayılan redux stateleri
    name: "user",
    initialState: {
        id: "",
        mail: "",
        adi: "",
        token: "",
        statu: "",
        preLoader:true,
    },
    reducers: {

        // kullanıcı girişinde kullanılacak aksiyon
        userLogin: (state, { payload }) => {
            state.id = payload.id,
            state.mail = payload.mail,
            state.adi = payload.adi,
            state.token = payload.token,
            state.statu = payload.statu
        },

        // kullanıcı kayıtında kullanılacak aksiyon
        userRegister: (state, { payload }) => {
            state.id = payload.id
            state.mail = payload.mail
        },

        // token
        userToken: (state, { payload }) => {
            state.token = payload.token
           
        },

        // kullanıcı çıkış yaptıgında initial state e geri döndügümüz aksiyon
        userLogout: (state) => {
            state.id =  state.token = state.mail = state.adi = state.statu = ""
        },

        setLoader: (state, { payload }) => {
            state.preLoader = payload.status
        },



    

    }
});

export const {
    userLogin,
    userRegister,
    userLogout,
    setLoader,
} = userSlice.actions;

export default userSlice.reducer;