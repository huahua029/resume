window.Model = function(options) {
    let resourceName = options.resourceName
    return {
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
            var query = new AV.Query(resourceName);
            return query.find() //promise对象
        },
        //存储数据
        save: function(obj) {
            var X = AV.Object.extend('resourceName')
            var x = new X()
            return x.save(obj)
        }
    }
}