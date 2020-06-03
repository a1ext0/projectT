import easyvk from 'easyvk'

export default function (ctx:any) {
    if (ctx.username && ctx.password) {
        return easyvk({
            username: ctx.username,
            password: ctx.password,
            v: '5.107',
            reauth: true
        })
    } else {
        return null
    }
}