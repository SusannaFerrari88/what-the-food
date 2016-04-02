export const VIEW_WIDTH = 375
export const TESTING = true
export const IP = '192.168.77.185'
export const PORT = '8080'

export const generateTestData = () => ({ jars: [ {
    fillAmount: Math.random(),
    food      : 'Müsli'
}, {
    fillAmount: Math.random(),
    food      : 'Reis'
} ] })
