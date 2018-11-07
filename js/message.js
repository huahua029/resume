! function() {
    var view = document.querySelector('.message')

    var model = {
        initAV: function() {
            var APP_ID = '53TH2xAew3KOSXIicnlIgFVn-gzGzoHsz';
            var APP_KEY = 'HmeGOyPYeFtShnJVdJkx0jt1';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        //获取数据
        fetch: function() {
            var query = new AV.Query('Message');
            return query.find() //promise对象
        },
        //存储数据
        save: function(name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({ //promise对象
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function() {
            this.model.fetch().then(
                (messages) => {
                    // 成功获得实例
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}:${item.content}`
                        this.messageList.append(li)
                    })
                })
        },
        bindEvents: function() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault() //防止刷新
                this.saveMessage()
            })
        },
        saveMessage: function() {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                // window.location.reload()
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                myForm.querySelector('input[name=content]').value = ''
                messageList.append(li)
            })
        }
    }
    controller.init(view)
}.call()