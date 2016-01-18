import * as express from 'express';
import * as path from 'path';

var port: number = process.env.PORT || 3000;
var app = express();

if (process.env.NODE_ENV == 'development') {
    app.use(require('connect-livereload')());
}

app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use('/app', express.static(path.resolve(__dirname, '..', 'client', 'app')));

app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

var server = app.listen(port, () => {
    console.log('Express app listening on port: ' + port);
});