import Vue from 'vue'
import message from './message.vue'
const NoticeConstructor = Vue.extend(message) // 直接将Vue组件作为Vue.extend的参数

let nId = 1

const Message = (options) => {
    let id = 'notice-' + nId++;
    options = options || {};
    if (typeof options === 'string') {//如何只传入字符串，将其设置为显示的信息
        options = {
            message: options//这里的message就是message.vue中data中的message
        };
    }

    const NoticeInstance = new NoticeConstructor({// 实例化一个带有content内容的Notice
        data: options	//在这里将你传过来的参数匹配到message.vue组件的data
    })
    NoticeInstance.id = id;
    NoticeInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    document.body.appendChild(NoticeInstance.$el) // 将dom插入body
    NoticeInstance.visible = true   //这里修改message.vue数据中的visible,这样message组件就显示出来

    // NoticeInstance.dom.style.zIndex = nId + 1001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    return NoticeInstance
};

// treeShaking
// composition
// fragment
// teleport
// Suspense
// ts
// custom render api

export default Message;


