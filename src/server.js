import app from "./app";

app.on('listening',function(){
    console.log('ok, server is running');
});

app.listen(3333);
