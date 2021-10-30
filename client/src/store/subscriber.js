// import store from '../store'
//
// store.subscribe((mutation) => {// если токен передан, сохряняем его в заголовки (headers)
//     switch (mutation.type) {
//         case 'SET_TOKEN':  // для мутации SET_TOKEN
//             if (mutation.payload) {
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
//                 localStorage.setItem('token', mutation.payload)  // устанавливаем токен в хранилище
//             } else {
//                 axios.defaults.headers.common['Authorization'] = null
//                 localStorage.removeItem('token')
//             }
//             break;
//     }
// })
