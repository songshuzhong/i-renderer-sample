const path = '/a/b/c';

const page = {
  renderer: 'page',
  body: [
    {
      renderer: 'helloworld'
    },
    {
      renderer: 'alert',
      title: '愤愤愤愤愤愤'
    },
    {
      renderer: 'A'
    },
    {
      renderer: 'image',
      src: `${path}/me.png`
    }
  ],
  innerStyle: '.demo-home-page {\r\n  background-color: blanchedalmond;\r\n  padding: 10px;\r\n}\r\n.pop {\r\n  position: absolute;\r\n  top: 0;\r\n}',
  classname: 'demo-home-page'
};

const assets = ['http://www.fsd.com/a.js'];
const pageSchema = page;
const pageInfo = 'pageSchema';

export {
  assets,
  pageSchema,
  pageInfo
};