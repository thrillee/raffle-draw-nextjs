export const maskAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
}

export const updateLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value)
    }
}

export const getLocalStorageValue = (key) => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem(key)
    }
    return null
}

export const removeLocalStoragevalue = (key) => {
    if (typeof window !== "undefined") {
        return window.localStorage.removeItem(key)
    }
}