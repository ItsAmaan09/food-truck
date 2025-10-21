const express = require("express");
const fs = require("fs");

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🍔 Welcome to Node Food Truck! Visit /menu to see what’s cooking.');
});

app.get("/menu", (req, res) => {
  const menu = JSON.parse(fs.readFileSync('menu.json'));
  res.json(menu);
});

app.post("/menu", (req, res) => {
    const menu = JSON.parse(fs.readFileSync('menu.json'));
    const newItem = req.body;

    newItem.id = menu.length ? menu[menu.length - 1].id + 1 : 1;
    menu.push(newItem);

    fs.writeFileSync('menu.json', JSON.stringify(menu,null,2));
    res.status(201).json(newItem);

});

app.delete("/menu/:id", (req,res) => {
    const menu = JSON.parse(fs.readFileSync('menu.json'));
    const newMenu = menu.filter(item => item.id != req.params.id);

    fs.writeFileSync('menu.json',JSON.stringify(newMenu,null,2));
    res.json({message: `Item ${req.params.id} removed`});
}); 

app.listen(PORT, () => {
  console.log(`Food truck running on http://localhost:${PORT}`);
});
