const {
    graphql,
    buildSchema
} = require('graphql');

const {
    bookSchema,
    bookQuery
} = require('../schemas_and_queries/book')(buildSchema);

const {
    booksSchema,
    booksQuery
} = require('../schemas_and_queries/books')(buildSchema);

const connection = require('../config');

        module.exports = {
            all: (req, res) => {
                connection.query('SELECT * from books', async (err, rows) => {
                    if (!err) {
                        const response = await graphql(booksSchema, booksQuery, {
                            books: rows
                        });
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send(JSON.stringify({
                            'result': 'success',
                            'data': response.data
                        }));
                    } else {
                        res.status(400).send(err);
                    }
                });
            },

           create: function (req, res, next) {
               let response;
               const name = req.body.name;
               const isbn = req.body.isbn;
               if (
                   typeof name !== 'undefined' &&
                   typeof isbn !== 'undefined'
               ) {
                   connection.query('INSERT INTO books (name, isbn) VALUES (?, ?)',
                       [name, isbn],
                       function (err, result) {
                           handleSuccessOrErrorMessage(err, result, res);
                       });

               } else {
                   response = {
                       'result': 'error',
                       'msg': 'Please fill required details'
                   };
                   res.setHeader('Content-Type', 'application/json');
                   res.status(200).send(JSON.stringify(response));
               }
           },

            get: (req, res) => {
                connection.query('SELECT * from books where id = ?', [req.params.id], async (err, rows) => {
                    const response = await graphql(bookSchema, bookQuery, {
                        book: rows[0]
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify({
                        'result': 'success',
                        'data': response.data
                    }));
                })
            },

           update: function (req, res) {
               let response;
               const name = req.body.name;
               const isbn = req.body.isbn;
               const id = req.params.id;
               if (
                   typeof name !== 'undefined' &&
                   typeof isbn !== 'undefined'
               ) {
                   connection.query('UPDATE books SET name = ?, isbn = ? WHERE id = ?',
                       [name, isbn, id],
                       function (err, result) {
                           handleSuccessOrErrorMessage(err, result, res);
                       });
               } else {
                   response = {
                       'result': name,
                       'msg': 'Please fill required information'
                   };
                   res.setHeader('Content-Type', 'application/json');
                   res.send(200, JSON.stringify(response));
               }
           },

            destroy: function (req, res) {
                connection.query('DELETE FROM books WHERE id = ?', [req.params.id], function (err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                });
            }
        };

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err) {
        let response;
        if (result.affectedRows != 0) {
            response = {
                'result': 'success'
            };
        } else {
            response = {
                'msg': 'No Result Found'
            };
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
}
        