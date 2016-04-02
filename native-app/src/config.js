export const VIEW_WIDTH = 375
export const TESTING = false
export const IP = '192.168.77.134'
export const PORT = '80'

export const generateTestData = () => ({ jars: [ {
    fillAmount: Math.random(),
    food      : 'banana'
}, {
    fillAmount: Math.random(),
    food      : 'pasta'
} ] })
