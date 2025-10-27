const exppress = require('express');
const app = exppress();
const port = 3000;
const db = require('./models');
app.use(exppress.json());
app.use(exppress.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log('Server started on port 3000' );
});

// Test database connection
db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
        console.log('Server Started');
    })
})
.catch((err) => {
 console.log(err);
});

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.send(err);
    }
});

app.get('/komik',  async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    }catch (error) {
        res.send(err);
    }
});

