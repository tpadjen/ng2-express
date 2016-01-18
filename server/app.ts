import * as express from 'express';
import * as path from 'path';

var port: number = process.env.PORT || 3000;
var app = express();

app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

var server = app.listen(port, () => {
    console.log('Express app listening on port: ' + port);
});