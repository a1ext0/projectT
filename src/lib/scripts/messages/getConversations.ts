import easyvk from '../../vk';

export default async function test(ctx: Context, token: any) {
  try {
    let offset = ctx.offset; //Получаем сдвиг из параметров запроса
    if (!offset) {
      offset = 0; //Сдвиг устанавливается на 0, если не был явно передан
    }
    let count = ctx.count; //Получаем количество сообщений из параметров запроса
    if (!count) {
      count = 20; //Количество устанавливается на 20, если не был явно передано
    }
    let vk = await easyvk.auth(token);
    let vkr = await vk.call('messages.getConversations', {
      offset: offset,
      count: count,
      extended: 1,
      fields: 'photo_100',
    });
    let conversations: Conversations = {
      a: [new Conversation(), new Conversation()],
    };
    let chatList = '';
    vkr.items.forEach((item: any, i: number) => {
      let conv = item.conversation;
      let last = item.last_message;
      conversations.a[i] = new Conversation();
      conversations.a[i].id = conv.peer.id;
      conversations.a[i].t = conv.peer.type;
      //Все беседы в список для дальнейшего запроса
      if (conv.peer.type === 'chat') {
        let newId = conv.peer.id - 2000000000; //В беседах используется local id
        if (!chatList || chatList.length == 0) {
          chatList += `${newId}`;
        } else {
          chatList += `, ${newId}`;
        }
      }
      conversations.a[i].u = conv.unread_count;
      conversations.a[i].c = conv.can_write.allowed;
      conversations.a[i].d = last.date;
      conversations.a[i].fr = last.from_id;
      conversations.a[i].lt = last.text;
    });
    //Внесение в уже существующий обьект с сообщениями данных о юзерах
    if (Array.isArray(vkr.profiles)) {
      for (let usr of vkr.profiles) {
        //Поиск поля с таким же ID как и у юзера
        let i = conversations.a.findIndex(function (item) {
          return item.id == usr.id;
        });
        //Если такой существует, заполняем его данными
        if (i !== -1) {
          conversations.a[i].f = usr.first_name; //Имя
          conversations.a[i].l = usr.last_name; //Фамилия
          conversations.a[i].p = usr.photo_100; //Фото 100px
        }
      }
    }

    if (Array.isArray(vkr.groups)) {
      for (let group of vkr.groups) {
        //Поиск поля с таким же ID как и у группы
        let i = conversations.a.findIndex(function (item) {
          return item.id == Number.parseInt(`-${group.id}`);
        });
        //Если такая существует, заполняем данными
        if (i !== -1) {
          conversations.a[i].n = group.name; //Имя
          conversations.a[i].p = group.photo_100; //Фото 100px
        }
      }
    }
    if (chatList != '') {
      let chats = await vk.call('messages.getChat', {
        chat_ids: chatList, //В запрос подаётся строка через запятую
        fields: 'photo_100', //Доп данные тоже строки
      });
      //Внесение в уже существующий обьект с сообщениями данных о беседах
      for (let chat of chats) {
        //Поиск поля с таким же ID как и у бесед
        let i = conversations.a.findIndex(function (item) {
          return item.id - 2000000000 == chat.id;
        });
        //Если такой существует, заполняем его данными
        if (i !== -1) {
          conversations.a[i].n = chat.title; //Имя
          conversations.a[i].p = chat.photo_100; //Фото 100px
        }
      }
    }
    return conversations;
  } catch (e) {
    console.log(e);
  }
}

class Conversation implements Conversation {}

interface Context {
  offset?: number | undefined;
  count?: number | undefined;
}

interface Conversations {
  /**
   * Количество бесед
   */
  c?: number;
  /**
   * Количество непрочитанных бесед
   */
  u?: number;
  /**
   * Массив с беседами
   */
  a: Array<Conversation>;
}

interface Conversation {
  /**
   * ID собеседника
   */
  id: number;
  /**
   * Тип собеседника (Человек, сообщество или беседа)
   */
  t: string;
  /**
   * Количество непрочитанных сообщений в беседе
   */
  u: number;
  /**
   * Разрешено ли писать пользователю
   */
  c: boolean;
  /**
   * Таймстамп отправки последнего сообщения в беседе
   */
  d: number;
  /**
   * От кого было последнее сообщение
   */
  fr: string;
  /**
   * Текст последнего сообщения в беседе
   */
  lt?: string;
  /**
   * Тип вложения
   */
  at?: boolean;
  /**
   * Фото вложения
   */
  ap?: boolean; // TODO: сделать объектом
  /**
   * Имя собеседника (если человек)
   */
  f?: string;
  /**
   * Фамилия собеседника (если человек)
   */
  l?: string;
  /**
   * Фото собеседника или беседы 100px
   */
  p?: string;
  /**
   * Название беседы или группы
   */
  n?: string;
}
