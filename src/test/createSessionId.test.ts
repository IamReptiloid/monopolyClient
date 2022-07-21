import {createSessionId} from "../utils/createSessionId";

describe('Unique id Test', () => {

    let setTimer: string
    const noTimer = createSessionId()

    it('Timer hooks', done => {
        setTimeout(() => {
            setTimer = createSessionId()
            done()
        }, 1000)
    })

    test('Delayed test',  () => {
        expect(noTimer).not.toBe(setTimer)
    })

    test('Test without delay',  () => {
        expect(noTimer).toBe(noTimer)
    })

})