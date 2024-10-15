const express = require('express');
const app = express()

app.listen(3000, () => {
    console.log('Listening on port 3000')
  })


//http://localhost:3000/greetings/aya  
//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}! What a delight it is to see you once more, ${username}.`);
  });


//http://localhost:3000/roll/8  
//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
  
    if (isNaN(number)) {
      res.send("You must specify a number.");
    } else {
      const rolledNumber = Math.floor(Math.random() * (parseInt(number) + 1));
      res.send(`You rolled a ${rolledNumber}.`);
    }
  });


//http://localhost:3000/collectibles/0 <--- number of index  
//3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
  
    if (index < 0 || index >= collectibles.length) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
  });

// Using Query Parameters
//http://localhost:3000/hello?name=aya&age=25   
app.get('/hello', (req, res) => {
  res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});


//4. Filter Shoes by Query Parameters 
//http://localhost:3000/shoes
//http://localhost:3000/shoes?min-price=20 
//http://localhost:3000/shoes?max-price=500
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

// Shoes route
app.get('/shoes', (req, res) => {
  const { minPrice, maxPrice, type } = req.query;  
  let filteredShoes = shoes;

  if (minPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(minPrice));
  }
  if (maxPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }
  if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  if (filteredShoes.length === 0) {
      res.send("No shoes found.");
  } else {
      res.send(filteredShoes);
  }
});




