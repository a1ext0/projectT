import easyvk from 'easyvk'

export default function test(ctx:any) {
    let username:string
    let password:string
    if (ctx.username && ctx.password) {
        username = ctx.username;
        password = ctx.password;
        easyvk({
            username: username,
            password: password,
            v: '5.107'
        }).then(vk => {
            vk.call('account.setOnline').then((vkr)=>{

                console.log('success');
                console.log(vkr);
            }).catch((err)=>{
                console.log('error');
                console.log(err);
            })
        })
    }
}

let ctx = {username: '89264283854', password: 'kokdfgdkok1'}

test(ctx)