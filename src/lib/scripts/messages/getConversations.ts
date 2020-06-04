import easyvk from '../../vk'

export default async function(ctx:Context, token:any) {
  try {
    let offset = ctx.offset; //Получаем сдвиг из параметров запроса
    if (!offset) {
        offset = 0; //Сдвиг устанавливается на 0, если не был явно передан
    }
    let count = ctx.count; //Получаем количество сообщений из параметров запроса
    if (!count) {
        count = 20; //Количество устанавливается на 20, если не был явно передано
    }
    let vk = await easyvk.auth(token)
    let vkr = await vk.call('messages.getConversations', {
        offset:offset,
        count:count,
        extended: 1,
        fields: 'photo_100'
    })
    let conversations: Conversations
} catch (e) {
    
}
}

interface Context {
  offset: number|undefined
  count: number|undefined
}

interface Conversations {
  /**
     * Количество бесед
  */
  c: number
  /**
     * Количество непрочитанных бесед
  */
  u: number
  /**
     * Массив с беседами
  */
  a: [Conversation]
}

interface Conversation {
  /**
     * ID собеседника
  */
  id:number
  /**
     * Тип собеседника (Человек, сообщество или беседа)
  */
  t:string
  /**
     * Количество непрочитанных сообщений в беседе
  */
 u:number
 /**
     * Разрешено ли писать пользователю
  */
 с:boolean
 /**
     * Таймстамп отправки последнего сообщения в беседе
  */
 d:number
 /**
     * Исходящее или входящее было последнее сообщение в беседе
  */
 lo:boolean // TODO: узнать подробнее
 /**
     * Текст последнего сообщения в беседе
  */
 lt?:string
 /**
     * Тип вложения
  */
 at?:boolean
 /**
     * Фото вложения
  */
 ap?:boolean // TODO: сделать объектом
 /**
     * Имя собеседника (если человек)
  */
 f?:string
 /**
     * Фамилия собеседника (если человек)
  */
 l?:string
 /**
     * Фото собеседника или беседы 100px
  */
 p?:string
 /**
     * Название беседы или группы
  */
 n?:string
}