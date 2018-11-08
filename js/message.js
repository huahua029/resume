! function() {
    var view = document.querySelector('.message')

    var model = Model({ resourceName: 'Message' })

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
            if (name && content) {
                this.model.save({ 'name': name, 'content': content }).then(function(object) {
                    // window.location.reload()
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    myForm.querySelector('input[name=content]').value = ''
                    messageList.append(li)
                })
            } else {
                alert('请检查输入')
            }

        }
    }
    controller.init(view)
}.call()