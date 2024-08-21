function genPassword(password) {
    var bcrypt = require('bcryptjs')
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    return hash
}

// const p = genPassword('123')
var bcrypt = require('bcryptjs');
var result = bcrypt.compareSync('123', '$2a$10$DFWQh.VAS9o3zxjyehX0Du0DXvQA22DuwYkY1TanYh/NHfCuHYl9i')
console.log(result)
// $2a$10$VHcWecGJsN3U6wIoFeXU8OmYfyaSj0wT.9CHBY6JLaWX6umwyzypa