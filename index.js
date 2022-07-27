const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

app.get('/', function(req, res) {
  console.log(req.query.textQuery)
  console.log('back ok')

  var {PythonShell} = require('python-shell');
  var pyshell = new PythonShell('./backend_py/make_cloud.py');  
  console.log("req")
  console.log(req.query.textQuery) //フロントエンドから受け取ったデータをconsole.logしている。

  // pyshell.send(req.query.textQuery); //本コードからpythonコードに'req.query.textQuery'を入力データとして提供する 

  //pythonコード実施後にpythonから本コードにデータが引き渡される。
  pyshell.on('message',  function (err, textQuery) {
    console.log("return data")
    if(err){
      console.log(err)
    }else{
      res.send({
        message: data   //pythonで実施した演算結果をフロントエンドに返している。
      })
    }
  })

})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})