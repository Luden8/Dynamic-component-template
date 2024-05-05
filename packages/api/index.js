const Koa = require('koa');
const router = require('@koa/router')();
const YAML = require('yaml')
const yamlToJson = require('js-yaml');
const bodyParser = require('koa-bodyparser');
const { promises: Fs } =  require('fs')
const cors = require('@koa/cors');
const path = require('path')

const FILENAME = 'template_config.yml'

const app = new Koa();
app.use(bodyParser());
app.use(cors());

router
    .get('/template', checkFileExists, getTemplate)
    .get('/data', getData)
    .post('/template', updateTemplate)


async function checkFileExists(ctx, next) {
    try {
        await Fs.open(path.join(__dirname, FILENAME))
        ctx.fileExists = true
    } catch(e) {
        ctx.fileExists = false
    }
    await next()

}

async function getTemplate(ctx, next) {
     if(!ctx.fileExists) {
         ctx.status = 404
         ctx.body = 'Not Found'
     }

     try {
         const file = await Fs.readFile(path.join(__dirname, FILENAME), 'utf8')
         ctx.body = await yamlToJson.load(file);
     } catch (e) {
         ctx.status = 500;
         ctx.body = e;
     }
}

async function updateTemplate(ctx) {
    const doc = new YAML.Document();
    doc.contents = ctx.request.body

    try {
        await Fs.writeFile(path.join(__dirname, FILENAME), doc.toString(), 'utf8')
        ctx.body = ctx.request.body
    } catch (err) {
        console.error(err)
        ctx.status = 400
    }
}

async function getData(ctx, next) {
    ctx.body = {
        title: 'test title',
        description: 'Test description',
    }
}


app.use(router.routes());

app.listen(3000);