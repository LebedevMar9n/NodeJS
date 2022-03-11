// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив
// і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує,
//     якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const fs = require('fs')
const {use} = require("express/lib/router");

const app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let users = [{firstName: "Andrii", age: 22, city: "lviv"},
    {firstName: "Bogdan", age: 32, city: "lviv"},
    {firstName: "Roman", age: 28, city: "Odesa"},
    {firstName: "Oleg", age: 23, city: "Rivne"},
    {firstName: "Sasha", age: 45, city: "Lutsk"},
    {firstName: "Marta", age: 55, city: "Kharkiv"}];

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.post('/login', (req, res) => {
    const oldUser = users.find(user => user.email === req.body.email);
    if (oldUser) {
        res.redirect('/error');
    } else {
        users.push({
            ...req.body, id: users.length + 1
            // users.length ? users[users.length - 1].id + 1 : 1
        })
        res.redirect('/users');
    }


});

app.get('/users', (req, res) => {
    let age = req.query.age ? +req.query.age : null;
    let city = req.query.city;
    console.log(users)
    let resolve = []
    if (age || city) {
        resolve = users.filter(i => {
            if (age && city) {
                return i.age === age && i.city === city
            }

            if (age) {
                return i.age === age
            }
            if (city) {
                return i.city === city
            }

        });
    } else {
        resolve = users
    }
    console.log(users)

    res.render('users', {users: resolve});


    //     if (req.query) {
    //         let filteredUsers = users.filter(
    //             user => user.city === req.query.city && user.age === req.query.age);
    //         res.render('users', {filteredUsers});
    //     } else {
    //         res.render('users', {users});
    //     }
});

app.get('/users/:userId', (req, res) => {
    let user = users.find(user => user.id === +req.params.userId)
    if (user) {
        res.render('user', {user});
    } else {
        res.redirect('/error');
    }

});

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Server has started on port 5200')
});


//
// const users1 = [
//     {name: "Andrii", age: 22, city: "lviv"},
//     {name: "Bogdan", age: 32, city: "lviv"},
//     {name: "Roman", age: 28, city: "Odesa"},
//     {name: "Oleg", age: 23, city: "Rivne"},
//     {name: "Sasha", age: 45, city: "Lutsk"},
//     {name: "Marta", age: 55, city: "Kharkiv"}
// ];
//
// const query={city:lviv,age:22}
// const res=users1.filter(Object.keys(query).every(key=>value[key]===query[key]))
// console.log()