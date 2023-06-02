export const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token") || "";
  };
  
  export const deleteToken = () => {
    localStorage.removeItem("token");
  };