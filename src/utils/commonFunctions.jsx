export const checkAuth = () => {
    const token = localStorage.getItem('authToken'); // or sessionStorage
    return token !== null;
};

