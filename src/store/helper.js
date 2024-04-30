
export const BASE_URL = "http://localhost:8080"
// export const BASE_URL = "http://13.201.209.254:8080";

export const localStorageWithExpiry = {
    setItem: function (key, value, expiryTime) {
        let result = {
            value,
            expiryTime: Date.now() + expiryTime
        };
        localStorage.setItem(key, JSON.stringify(result));
    },
    isExpire: function (key) {
        let data = localStorage.getItem(key);
        data = JSON.parse(data);
        if (data?.expiryTime <= Date.now()) {
            return true;
        }
        return false;
    },
    getItem:function(key) {
       let data= localStorage.getItem(key)
       data=JSON.parse(data);
       return data.value;
    },
    removeItem: function (key) {
        localStorage.removeItem(key)
    },
    clearItem: function () {
        localStorage.clear()
    }
}