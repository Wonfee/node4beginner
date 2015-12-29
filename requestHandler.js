    fs = require("fs");
    formidable = require("./node_modules/formidable");

function start(response, postData){
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
                '<head>' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
                '</head>' +
                '<body>' +
                '<form action="/upload" enctype="multipart/form-data" method="post">' +
                '<input type="file" name="upload"/>' +
                '<input type="submit" value="Upload file" />' +
                '</form>' +
                '</body>' +
                '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm(), fields=[], files=[];
    console.log("about to parse");

    form.parse(request, function(error, fields, files){
        console.log("parsing done file="+files.upload.path);
        fs.renameSync(files.upload.path, "/tmp/test.gif");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<br/>");
        response.write("<img src='/show' />");
        response.end();
    });

}

function show(response){
   console.log("Request handler 'show' was called.");
   //fs.readFile("/tmp/test.png", "binary", function(error, file){
   fs.readFile("/tmp/test.gif", "binary", function(error, file){
    if(error){
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error+"\n");
        response.end();
    }else{
        response.writeHead(200, {"Content-Type": "image/gif"});
        response.write(file, "binary");
        response.end();
    }
   });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
