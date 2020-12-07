
var fs = require('fs')
var path = require('path')
var upyun = require('upyun')
var service = new upyun.Service('eyeefiles', 'eyeeadmin', 'Eyee@934')
var client = new upyun.Client(service)
var localFilePath = path.join(path.resolve(__dirname, '../src/assets/img/sprite.png'))
var putFile = path.join('/eyeeh5/img/', 'sprite.png')


var load = function () {
    fs.readFile(localFilePath, { 'Content-Type': 'text/html;charset=UTF8' }, function (err, data) {
        // console.log('data--', data)
        if (err) return
        client
            .putFile(putFile, data) //, { 'Content-Type': 'text/css' }
            .then(res => {
                console.log('putFile', res)
                // uploader()
            })
            .catch(e => {
                console.error(' putFile error', e)
            })
    })
}

load()
module.exports = {
    load
}

